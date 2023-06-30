const ApiError = require('../error/ApiError');
const { Rating } = require('../models/models');

class ratingController {
  static async getDeviceRatingFunc(deviceId) {
    const ratesRecords = await Rating.findAll({ where: { deviceId } });
    const rates = ratesRecords.map((rate) => rate.dataValues.rate);
    const rating = rates.reduce((a, b) => a + b, 0) / rates.length || 0;
    return rating;
  }

  static async setRating(req, res, next) {
    try {
      const { rate, userId, deviceId } = req.body;
      if (!rate || !userId || !deviceId) {
        return next(ApiError.badRequest('Неверные данные для установки рейтинга товара!'));
      }
      let newRating;

      const oldRating = await Rating.findOne({ where: { userId, deviceId } });
      if (oldRating) {
        const isSetRating = await Rating.update({ rate }, { where: { userId, deviceId } });
        if (isSetRating.length === 1) {
          newRating = await Rating.findOne({ where: { userId, deviceId } });
        }
      } else {
        newRating = await Rating.create({ rate, userId, deviceId });
      }

      return res.json(newRating);
    } catch (e) {
      return next(ApiError.internal('Произошла ошибка при сохранении рейтинга товара!'));
    }
  }

  static async getDeviceRating(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest('Не указан Id устройства'));
    }

    const rating = await ratingController.getDeviceRatingFunc(id);
    return res.json({ rating });
  }
}

module.exports = ratingController;
