const twoFactor = require('node-2fa');
const axios = require('axios');
const apiConfig = require('../../config/api.config');
const { settings } = require('./settings.controller');

exports.getAllItems = (appId) => new Promise((res, rej) => {
  const twoFactorCode = exports.generateTwoFactor();

  axios.get(`https://bitskins.com/api/v1/get_all_item_prices/?api_key=${apiConfig.bitskins.bitskins_api}&code=${twoFactorCode}&app_id=${appId}`)
    .then((result) => {
      const { data } = result;
      if (data.status === 'success') {
        return res(data.prices);
      }
      return rej('Error');
    })
    .catch((err) => rej(err));
});

exports.findItem = (appId, marketHashName) => new Promise(async (res, rej) => {
  const twoFactorCode = exports.generateTwoFactor();
  const setting = await settings();

  axios.get(`https://bitskins.com/api/v1/get_inventory_on_sale/?api_key=${apiConfig.bitskins.bitskins_api}&code=${twoFactorCode}&app_id=${appId}&market_hash_name=${encodeURI(marketHashName)}&sort_by=price&order=asc`)
    .then((result) => {
      const { data } = result;
      if (typeof data.data.items[0] !== 'undefined') {
        // eslint-disable-next-line max-len
         if (parseFloat(data.data.items[0].price) <= parseFloat(data.data.items[0].suggested_price - (data.data.items[0].suggested_price * (setting.max_buy_percent / 100)))) {
           return res(data.data.items[0]);
        }

        return rej('Error');
      }
      return rej('Error');
    })
    .catch((err) => rej(err));
});

exports.buyItem = (appId, item) => new Promise((res, rej) => {
  const twoFactorCode = exports.generateTwoFactor();

  axios.get(`https://bitskins.com/api/v1/buy_item/?api_key=${apiConfig.bitskins.bitskins_api}&code=${twoFactorCode}&item_ids=${item.item_id}&prices=${item.price}&app_id=${appId}`)
    .then((result) => {
      const { data } = result;

      return res(data);
    }).catch((err) => rej(err));
});

exports.getTradeStatus = (tradeToken, tradeID) => new Promise((res, rej) => {
  const twoFactorCode = exports.generateTwoFactor();

  axios.get(`https://bitskins.com/api/v1/get_trade_details/?api_key=${apiConfig.bitskins.bitskins_api}&code=${twoFactorCode}&trade_token=${tradeToken}&trade_id=${tradeID}`)
    .then((result) => {
      const { data } = result;

      return res(data);
    })
    .catch((err) => rej(err));
});

exports.generateTwoFactor = () => {
  const token = twoFactor.generateToken(apiConfig.bitskins.bitskins_f2a);
  console.log(apiConfig.bitskins.bitskins_f2a);
  console.log(twoFactor.generateToken(apiConfig.bitskins.bitskins_f2a));
  return token.token;
};
