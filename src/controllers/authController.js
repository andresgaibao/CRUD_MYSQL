// controllers/authController.js

import * as authModel from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// Controlador para registrar un usuario

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validamos campos vacios.
        if (!username || !email || !password) {
            res.status(400).json({ message: "Faltan datos" });
        }

        // Validamos el formato del email.
        if (!validator.isEmail(email)) {
            res.status(400).json({ message: "El email no es válido" });
        }

        // Validados el formato de la contraseña.
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
            return res.status(400).json({
                message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener al menos 8 caracteres'
            });
        }

        // Verificar si el email ya esta en uso.
        const existingUser = await authModel.getUserbyEmail(email);
        if(existingUser){
            return res.status(400).json({ message: 'El correo electronico ya esta en uso' });
        }
        await authModel.registerUser({ username, email, password });
        res.status(201).json({ message: 'Usuario registerado exitosamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

// Controlador para iniciar sesión
// loginUser

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validamos campos vacios.
        if (!email || !password) {
            res.status(400).json({ message: "Faltan datos" });
        }

        // Validamos el formato del email.
        if (!validator.isEmail(email)) {
            res.status(400).json({ message: "El email no es válido" });
        }
        const user = await authModel.loginUser(email, password);
        
        // Generar token de authentication.
        const token = jwt.sign({userId: user.id, email: user.email}, 'secret_key');
        // Asignar el token a una cookie.
        res.cookie('token',token, {httpOnly: true});
        res.status(201).json({message: 'Inicio de sesion exitoso', email, token});
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
 
}