import express from 'express';
import { } from 'express-async-errors';
import bodyParser from 'body-parser';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// POST /auth/signup 
router.post('/signup', bodyParser.json(), bodyParser.urlencoded({ extended: true }), authController.signup);
//  POST /auth/login 
router.post('/login', bodyParser.json(), bodyParser.urlencoded({ extended: true }), authController.login);
//   GET /auth/me
router.get('/me',isAuth,authController.me);

export default router;
