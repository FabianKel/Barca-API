import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET

const generateToken = (user) => {
    return jwt.sign(user, SECRET, { expiresIn: '10m', algorithm: 'HS256'})
}


const validateToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET);


        return{
            decodedToken: decodedToken
        }
    } catch(e) {
        if (e.name === 'TokenExpiredError') {
            return {
                expired: true,
                error: 'Token de acceso vencido'

            };
        } else {
            console.error('Invalid token', e);
            return false;
        }
    }
}

export {generateToken, validateToken}