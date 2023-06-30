const { Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
  static async create(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        return next(ApiError.badRequest('Не указано имя бренда'));
      }

      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }
}

module.exports = BrandController;
