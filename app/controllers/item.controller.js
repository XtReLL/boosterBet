const hexa = require("hexa.one");
const moment = require('moment');
require('moment-timezone');
const apiConfig = require('../../config/api.config');
const bitskinsController = require('./bitskins.controller');
const { settings } = require('./settings.controller');
const Cache = '../base/cache';

const db = require('../models');
const Item = db.item;
const Inventory = db.inventory;
const User = db.user;
const Settings = db.settings;

const Hexa = new hexa(apiConfig.HEXA);

exports.fillItems = () => new Promise(async (res, rej) => {
  try {
    console.log('Загрузка предметов ...');

    let items = await Hexa.getItems(252490);
    const prices = await bitskinsController.getAllItems(252490);

    items = items.result.items;
    console.log(items);
    console.log(prices);
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const marketHashName in items) {
      try {
        const priceIndex = prices.findIndex((x) => x.market_hash_name === items[marketHashName].market_name);
        if (items[marketHashName].tradable && priceIndex > -1 && prices[priceIndex].price > 0.3) {
          // eslint-disable-next-line no-await-in-loop
          await Item.create({
            market_hash_name: prices[priceIndex].market_hash_name,
            image: items[marketHashName].icon_url_large,
            exterior: prices[priceIndex].quality_color,
            rarity: prices[priceIndex].rarity_color,
            color: prices[priceIndex].name_color,
            price: prices[priceIndex].price,
            classId: prices[priceIndex].price || null
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    console.log('Продукты загружены');

    return res(true);
  } catch (e) {
    return rej(e);
  }
});

exports.checkExistsItems = () => new Promise(async (res) => {
  const items = await Item.findOne();

  if (items === null) {
    return res(true);
  }
  return res(false);
});

exports.get = async (req, res) => {
  const page = req.query.page ?? 1;
  const sort = (typeof req.query.sort !== 'undefined' && req.query.sort.length > 0) ? req.query.sort : 'desc';
  const marketHashName = (typeof req.query.market_hash_name !== 'undefined' && req.query.market_hash_name.length > 0)
    ? req.query.market_hash_name : '';
  const min = (typeof req.query.min !== 'undefined' && req.query.min > 0) ? req.query.min : 0;
  const max = (typeof req.query.max !== 'undefined' && req.query.max > 0) ? req.query.max : 999999;
  const perPage = 20;

  try {
    const items = await Item.find({
      market_hash_name: { $regex: marketHashName, $options: 'i' },
      price: { $gte: min, $lte: max },
    })
      .limit(perPage)
      .skip(perPage * (page - 1))
      .sort({
        price: sort,
      });

    return res.json({
      page: parseInt(page),
      items,
    });
  } catch (e) {
    return res.status(400).json({
      err: 'Произошла ошибка',
    });
  }
};

exports.buy = async (req, res) => {
  try {
    const { myIds, siteIds } = req.body;
    const user = await User.findOne({ _id: req.user._id });

    if (typeof Cache.get(`buy_${req.user._id}`) !== 'undefined') {
      return res.status(400).json({
        err: 'Не так часто',
      });
    }

    Cache.set(`buy_${req.user._id}`, 1, 5);

    if (siteIds.length === 0) {
      return res.status(400).json({
        err: 'Вы не выбрали предметы',
      });
    }

    let sitePrice = 0;
    let invPrice = 0;

    for (const id of siteIds) {
      const item = await Item.findOne({ _id: id });

      if (item === null) {
        return res.status(400).json({
          err: 'Одного из предметов нет на сайте',
        });
      }

      sitePrice += item.price;
    }

    for (const id of myIds) {
      let inv = null;

      try {
        inv = await Inventory.findOne({
          user: req.user._id,
          _id: id,
        }).populate('item');
      } catch (e) {
        inv = null;
      }

      if (inv === null) {
        return res.status(400).json({
          err: 'Один из предметов не найден в Вашем инвентаре',
        });
      }

      invPrice += inv.item.price;
    }

    const extBalance = (sitePrice - invPrice).toFixed(2);

    if (extBalance > 0 && (user.balance) < extBalance) {
      return res.status(400).json({
        err: 'Не достаточно средств на балансе',
      });
    }
    if (extBalance === 0 && (user.balance) < sitePrice) {
      return res.status(400).json({
        err: 'Не достаточно средств на балансе',
      });
    }

    for (const id of myIds) {
      await Inventory.deleteMany({ _id: id });
    }

    for (const id of siteIds) {
      await Inventory.create({
        user: user._id,
        item: id,
      });
    }

    user.balance = (parseFloat(user.balance) - parseFloat(extBalance)).toFixed(2);
    await user.save();

    return res.json({
      message: `Вы успешно купили ${siteIds.length} ${wordForm(siteIds.length, ['предмет', 'предмета', 'предметов'])}`,
    });
  } catch (e) {
    console.log(e);

    return res.status(400).json({
      err: 'Произошла ошибка',
    });
  }
};

exports.updatePrices = async (req, res) => {
  const config = await settings();

  let items = await Hexa.getItems(252490);
  const prices = await bitskinsController.getAllItems(252490);

  items = items.result.items;

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const marketHashName in items) {
    try {
      const priceIndex = prices.findIndex(
        (x) => x.market_hash_name === marketHashName,
      );

      if (items[marketHashName].tradable && priceIndex > -1 && prices[priceIndex].price > 0.3) {
        const itemBD = await Item.findOne({ market_hash_name: marketHashName });

        if (itemBD === null) {
          await Item.create({
            market_hash_name: prices[priceIndex].market_hash_name,
            image: items[marketHashName].icon_url_large,
            exterior: prices[priceIndex].quality_color,
            rarity: prices[priceIndex].rarity_color,
            color: prices[priceIndex].name_color,
            price: prices[priceIndex].price,
          });
        } else {
          Item.findOneAndUpdate({
            _id: itemBD._id,
          }, {
            price: prices[priceIndex].price,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  await Settings.findOneAndUpdate({ _id: config._id }, {
    last_update_prices: moment().tz('Europe/Kirov').format('DD-MM-YYYY HH:mm:ss'),
  });

  return res.redirect('back');
};

const wordForm = (num, word) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return word[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
};
