import jwt from 'jsonwebtoken';

const generateTtoken = (payload) => jwt.sign(payload, 'dev_secret', { expiresIn: '7d' });

export default generateTtoken;
