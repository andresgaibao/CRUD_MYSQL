// routes/authRoutes.js

import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Enpoint para registro de usuarios
// api/register

router.post('/register', authController.registerUser);

// Enpoint para login
// api/login

router.post('/login', authController.loginUser);

export default router;
