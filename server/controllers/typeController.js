const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
  static async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  static async getAll(req, res) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (e) {
      return next(ApiError.internal('Ошибка при получении '));
    }
  }
}

module.exports = TypeController;
