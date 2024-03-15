import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies  from 'js-cookie';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            const token = response.data.token;
            const email = response.data.email;
            Cookies.set('token', token);
            alert('Inicio de sesión exitoso');
            navigate('/products');
        } catch (error) {
            console.log(error.response.data.message)
            alert(error.response.data.message);
            
        }
    }

    return (
        <div className="container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;
