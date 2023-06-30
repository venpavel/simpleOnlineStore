const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const ApiError = require('../error/ApiError');

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      return next();
    }
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Bearer skdfjflksjflkdsf
      if (!token) {
        return next(ApiError.noAuthorization('Вы не авторизованы'));
      }
      const decoded = jwt.verify(token, secret);
      if (decoded.role !== role) {
        return next(ApiError.forbidden('Нет доступа!'));
      }
      req.user = decoded;
      next();
    } catch (e) {
      return next(ApiError.noAuthorization('Вы не авторизованы'));
    }
  };
};
