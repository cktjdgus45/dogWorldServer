import express from 'express';
import { } from 'express-async-errors';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

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
//   PUT /auth/me //update user profile
router.put('/me', isAuth, upload.single('file'), authController.update);

// PUT /auth/me update profile. 추후추가할것.

export default router;
