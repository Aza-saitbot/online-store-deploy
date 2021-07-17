const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  //создание устройства
  async create(req, res, next) {
    try {
      // из тела запроса дуструктр-м в переменные
      let { name, price, brandId, typeId, info } = req.body;
      //забираем из тела запроса файл
      const { img } = req.files;
      //с помощью uuid присваеваем уникальное имя + формат для дальнейшего поиска изображения
      let fileName = uuid.v4() + ".jpg";
      //указываем с помощью path путь к статическому папку
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      //создаем устройство
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      /*если из тело запроса пришел допол-е инфо об устр-ве, то метод проходим по элементам,
      айди назначится после создания пол-я автом.*/

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }
      //вовзращает устройство
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //дай нам все устройства
  async getAll(req, res) {
    //забираем из тела запроса, если они есть айди выбронного бренда и устройства,заданные лимит на стр и текущую стр
    let { brandId, typeId, limit, page } = req.query;
    //если не задано задаем по умолчанию
    page = page || 1;
    limit = limit || 9;
    //задаем отступы, рассчитаем, если нажали на след страницу то дай нам следующие порцию 9 товров
    let offset = page * limit - limit;
    //дай нам все устройства с лимит 9 товаров на страницу
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    //дай нам все устр-м только с заданным брендом с лимит 9 товав
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    //дай нам только определенные устр-ва, 9 товаров
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    //верни нам любые товары, с лимитом на стр 9 товаров
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    //возвращаем на клиент
    return res.json(devices);
  }

  //дай нам только один товар
  async getOne(req, res) {
    //достаем айди товара из параметра, к-е назначили в deviceController '/:id' забираем выбренный товар по айди
    const { id } = req.params;
    //находим товар по айди и передаем модель доп. характирсики устройства
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
