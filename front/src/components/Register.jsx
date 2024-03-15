import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '', 
        password: ''
    });

    const navigate = useNavigate();// for redirection to login

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Corregir el método preventDefault
        try {
            await axios.post('/register', formData);
            alert('Usuario registrado correctamente');
            navigate('/login');
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        }
    }
    
  return (
    <>
         <div className="container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit} id="register-form">
            <div className="form-group">
                <label htmlFor="username">Nombre de usuario:</label>
                <input type="text" id='username' name="username" placeholder='username' value={formData.username} onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Correo electrónico:</label>
                <input type="email" id='email' name="email" placeholder='email' value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id='password'  name="password" placeholder='password' value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Registrarse</button>
        </form>
        </div>
    </>
  )
}

export default Register
