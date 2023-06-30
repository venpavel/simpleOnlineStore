const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer dsfdsfdsfsddfs
    if (!token) {
      res.status(401).json({ message: 'Пользователь не авторизован' });
    }
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Пользователь не авторизован' });
  }
};
