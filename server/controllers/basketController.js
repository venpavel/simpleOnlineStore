/* eslint-disable no-restricted-syntax */
const { BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class basketController {
  static async addDevice(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;
      const basketDevice = await BasketDevice.findAll({ where: { basketId, deviceId } });
      if (basketDevice.length) {
        return next(ApiError.badRequest('Товар уже есть в корзине!'));
      }

      const newBasket = await BasketDevice.create({ basketId, deviceId });
      return res.json(newBasket);
    } catch (e) {
      return next(ApiError.internal('Ошибка при добавлении товара в корзину'));
    }
  }

  static async getContent(req, res, next) {
    try {
      const { id } = req.params;
      const basketDevices = await BasketDevice.findAll({ where: { basketId: id } });

      for (const item of basketDevices) {
        // eslint-disable-next-line no-await-in-loop
        const device = await Device.findByPk(item.deviceId);
        item.dataValues.device = device.dataValues;
      }

      return res.json(basketDevices);
    } catch (e) {
      return next(ApiError.badRequest('Произошла ошибка при получении корзины'));
    }
  }

  static async removeDevice(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;
      if (!basketId || !deviceId) {
        return next(ApiError.badRequest('Не указан Id товара или корзины!'));
      }
      const deviceRemoved = await BasketDevice.destroy({ where: { basketId, deviceId } });
      if (deviceRemoved !== 1) {
        return next(ApiError.internal('Ошибка удаления товара из корзины'));
      }

      const basket = await BasketDevice.findAll({ where: { basketId } });

      return res.json(basket);
    } catch (e) {
      return next(ApiError.internal('Ошибка удаления товара из корзины'));
    }
  }
}

module.exports = basketController;
