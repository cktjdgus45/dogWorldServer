import * as authRepository from '../data/auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { } from 'express-async-errors';

//임시용. 추후 보안추가 필.
const jwtSecretKey = 'Ck"|f5AAxm{jww~nb0:MQL70:^:KjcW6';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

const createJwtToken = (id) => {
    return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export const signup = async (req, res, next) => {
    const { username, password, name, email, url } = req.body;
    const isAlreadyExistUser = await authRepository.findByUsername(username);
    if (isAlreadyExistUser) {
        //A 409 status code is used to indicate a conflict 
        //with the current state of a resource, 
        //such as when trying to create or
        // update a resource that already exists or has conflicting information
        return res.status(409).json({ message: `${username}는 이미 존재하는 이름입니다.` });
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await authRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url
    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
    //The 201 Created status code means that the request was successfully fulfilled 
    //and resulted in one or possibly multiple new resources being created.
}
export const login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await authRepository.findByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid user or password' })
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }
    const token = createJwtToken(user.id);
    return res.status(200).json({
        token, //(jwt)
        username
    })
}
export const me = async (req, res, next) => {
    const user = await authRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ token: req.token, username: user.username });
}