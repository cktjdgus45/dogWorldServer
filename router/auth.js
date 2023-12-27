import express from 'express';
import { } from 'express-async-errors';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const checkError = (req, res, next) => {
    next();
}

// POST /auth/signup 
router.post('/signup', checkError, authController.signup);
//  POST /auth/login 
router.post('/login', authController.login);
// POST /auth/logout
router.post('/logout', authController.logout);
//   GET /auth/me
router.get('/me', isAuth, authController.me);

export default router;
