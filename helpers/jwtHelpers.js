
import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  const secretKey = 'your-secret-key'; 
  const options = { expiresIn: '7d' }; 
  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token) => {
  const secretKey = 'your-secret-key'; 
  return jwt.verify(token, secretKey);
};
