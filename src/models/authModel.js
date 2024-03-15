// model/authModel.js
import {dbConfig} from '../config/db.config.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt'

const pool = mysql.createPool(dbConfig);

// Registrar un usuario.
// registerUser

export const registerUser = async (userData) => {
    const { username, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, email, password) VALUES(?,?,?)', [username, email, hashedPassword]);
};

// Funcion para obtener un usuario que ya existe por el email
// getUserbyEmail
export const getUserbyEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
};


// Login user
// loginUser
export const loginUser = async (email, password) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email =?', [email]);
    if (!rows.length) {
       throw new Error('Usuario no existe');
    }
    const user =  rows[0];
    const isPasswordValid =await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }
    return user;
};