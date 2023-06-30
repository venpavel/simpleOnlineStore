const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const { User, Basket } = require('../models/models');
const { secret } = require('../config');

const generateJwt = (id, email, role) => jwt.sign({ id, email, role }, secret, { expiresIn: '1h' });

class UserController {
  static async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('Некорректный email или пароль'));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует!'));
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const user = await User.create({ email, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      user.dataValues.basket = basket;

      const token = generateJwt(user.id, email, user.role);
      user.dataValues.token = token;

      return res.json(user);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или пароль'));
    }

    const candidate = await User.findOne({ where: { email } });

    if (!candidate) {
      return next(ApiError.internal('Пользователь не найден'));
    }

    const isRightUser = bcrypt.compareSync(password, candidate.password);
    if (!isRightUser) {
      return next(ApiError.badRequest('Некорректный email или пароль'));
    }

    const token = generateJwt(candidate.id, email, candidate.role);
    return res.json({ token });
  }

  static async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = UserController;
