import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer'))) {
        return res.status(401).json(AUTH_ERROR);
        //The 401 (Unauthorized) status code indicates that 
        //the request has not been applied 
        //because it lacks valid authentication credentials for the target resource.
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    //token must be more secure.
    jwt.verify(token, 'Ck"|f5AAxm{jww~nb0:MQL70:^:KjcW6', async (err, decoded) => {
        if (err) {
            // Token verification failed
            return res.status(401).json(AUTH_ERROR);
        } else {
            // Token is valid, and `decoded` contains the decoded payload
            const user = await userRepository.findById(decoded.id);
            console.log(decoded)
            console.log(user);
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id; //req.potato = id (same) custom
            req.token = token; // req에 custom으로 등록.
            next();
        }
    });
}
