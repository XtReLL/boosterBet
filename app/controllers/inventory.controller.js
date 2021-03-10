const db = require("../models");
// const botController = require('./botController');
const { settings } = require('./settings.controller');

const Inventory = db.inventory;
const Item = db.item;
const User = db.user;
const Payment = db.payment;

exports.get = async (req, res) => {
  const inventory = await Inventory.findOne({ where: {userId: req.userId, status: 0} });
  const inv = [];
  console.log(inventory);

  for (const item of inventory) {
    inv.push({
      id: item.id,
      item: await item.getItem()
    });
  }
  console.log(inv);
  return res.json({
    items: inv.sort(priceSorting),
  });
};

// exports.getUserInventory = async (req, res) => {
//   const setting = await settings();

//   try {
//     const inventory = await botController.getUserInventory(req.user.steamid);
//     const items = [];

//     for (const id in inventory) {
//       const item = inventory[id];
//       const existsItem = await exports.existsItem(item);

//       if (existsItem !== null && item.tradable) {
//         const price = (existsItem.price * ((100 - setting.withdraw_commission) / 100));

//         if (price >= 0.01) {
//           item.price = price.toFixed(2);

//           items.push(item);
//         }
//       }
//     }

//     return res.json(items);
//   } catch (e) {
//     return res.status(400).json({
//       err: e.message,
//     });
//   }
// };

// exports.addItemsFromDeposit = async (deposit) => {
//   const config = await settings();
//   const user = await User.findOne({ _id: deposit.user });

//   if (user === null) {
//     return;
//   }

//   const setting = await settings();

//   let sum = 0;
//   const existsItems = [];

//   for (const item of deposit.items) {
//     const exists = await exports.existsItem(item);

//     if (exists !== null) {
//       existsItems.push(exists);

//       sum += parseFloat(exists.price * ((100 - setting.withdraw_commission) / 100));
//     }
//   }

//   user.balance += sum;
//   user.payment_sum += sum;
//   user.save();

//   const paymSum = (sum * 75.70).toFixed(2);

//   await Payment.create({
//     user,
//     sum: paymSum,
//     status: 1,
//     type: 'skins',
//     items: existsItems,
//   });

//   if (user.referral_use !== null) {
//     const referralUser = await User.findOne({ referral_code: user.referral_use });

//     if (referralUser !== null) {
//       const bonus = parseFloat(sum) * (config.bonus_referral / 100);

//       referralUser.balance += bonus;
//       referralUser.referral_sum += bonus;
//       await referralUser.save();
//     }
//   }

//   deposit.status = 1;
//   await deposit.save();
// };

// exports.existsItem = async (item) => new Promise(async (res, rej) => {
//   try {
//     const itemBD = await Item.findOne({ market_hash_name: item.market_hash_name });

//     return res(itemBD);
//   } catch (e) {
//     return res(null);
//   }
// });

const priceSorting = (a, b) => {
  if (a.item.price > b.item.price) {
    return -1;
  }
  if (a.item.price < b.item.price) {
    return 1;
  }
  return 0;
};
