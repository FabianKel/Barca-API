import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET

const generateToken = (user) => {
    return jwt.sign(user, SECRET, { expiresIn: '1h', algorithm: 'HS256'})
}


const validateToken = (token) => {
    try {
        return jwt.verify(token, SECRET)
    } catch(e) {
        console.error('Invalid token', e)
        return false
    }
}

export {generateToken, validateToken}