const db = require('../models');
const Settings = db.settings;

exports.settings = async () => {
  let settings = await Settings.findOne();

  if (settings === null) {
    settings = await Settings.create({});
  }

  return settings;
};

exports.getSettings = async (req, res) => {
  const settings = await exports.settings();

  return res.json({
    percent_referral: settings.bonus_referral
  });
};