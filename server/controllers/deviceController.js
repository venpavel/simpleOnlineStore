const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const ratingController = require('./ratingController');

class DeviceController {
  static async create(req, res, next) {
    try {
      const { name, price, rating, typeId, brandId, info } = req.body;
      let fileName;
      if (!name || !price) {
        return next(ApiError.badRequest('No Input data'));
      }
      const parsedInfo = JSON.parse(info);
      console.log(parsedInfo);
      if (!req.files) {
        fileName = `nofoto.jpg`;
      } else {
        const { img } = req.files;
        fileName = `${uuid.v4()}.jpg`;
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
      }

      const device = await Device.create({
        name,
        price,
        rating,
        img: fileName,
        typeId,
        brandId,
      });

      device.dataValues.deviceInfo = [];

      if (Array.isArray(parsedInfo)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of parsedInfo) {
          // eslint-disable-next-line no-await-in-loop
          const deviceInfo = await DeviceInfo.create({
            ...item,
            deviceId: device.id,
          });
          device.dataValues.deviceInfo.push(deviceInfo.dataValues);
        }
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
    return next(ApiError.badRequest('Непредвиденная ошибка'));
  }

  static async getAll(req, res) {
    const { typeId, brandId } = req.query;
    let { page, limit } = req.query;
    limit = limit || 9;
    page = page || 1;
    const offset = page * limit - limit;

    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }

    return res.json(devices);
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest('Id устройства не указан!'));
    }
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    if (!device) {
      return next(ApiError.badRequest('Устройство с указанным Id не найдено!'));
    }
    const type = await device.getType();
    device.dataValues.type = type.name;
    device.dataValues.brand = await device.getBrand();
    device.dataValues.rating = await ratingController.getDeviceRatingFunc(id);

    /*
    device.dataValues.deviceInfo = await DeviceInfo.findAll({
      where: { deviceId: id },
    });
    */

    return res.json(device);
  }
}

module.exports = DeviceController;
