module.exports = (sequelize, Sequelize) => {
    const Settings = sequelize.define("settings", {
        profit: {
            type: Sequelize.DOUBLE,
            defaultValue: 0.00
        },
        chat_min: {
            type: Sequelize.INTEGER,
            defaultValue: 3
        },
        chat_max: {
            type: Sequelize.INTEGER,
            defaultValue: 100
        },
        chat_count: {
            type: Sequelize.INTEGER,
            defaultValue: 20
        },
        bet_count: {
            type: Sequelize.INTEGER,
            defaultValue: 3
        },
        fake_online_min_day: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        fake_online_max_day: {
            type: Sequelize.INTEGER,
            defaultValue: 10
        },
        fake_online_min_evening: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        fake_online_max_evening: {
            type: Sequelize.INTEGER,
            defaultValue: 10
        },
        fake_online_min_night: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        fake_online_max_night: {
            type: Sequelize.INTEGER,
            defaultValue: 10
        },
        freekassa_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        freekassa_secret_1: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        freekassa_secret_2: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        interkassa_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        interkassa_secret_1: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        interkassa_secret_2: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        unitpay_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        unitpay_secret_1: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        unitpay_secret_2: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        min_payment: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        bonus_referral: {
            type: Sequelize.INTEGER,
            defaultValue: 10
        },
        bots_min_day: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        bots_max_day: {
            type: Sequelize.INTEGER,
            defaultValue: 5
        },
        bots_min_bet_day: {
            type: Sequelize.DOUBLE,
            defaultValue: 1.00
        },
        bots_max_bet_day: {
            type: Sequelize.DOUBLE,
            defaultValue: 5.00
        },
        bots_random_items_day: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        bots_min_evening: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        bots_max_evening: {
            type: Sequelize.INTEGER,
            defaultValue: 5
        },
        bots_min_bet_evening: {
            type: Sequelize.DOUBLE,
            defaultValue: 1.00
        },
        bots_max_bet_evening: {
            type: Sequelize.DOUBLE,
            defaultValue: 5.00
        },
        bots_random_items_evening: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        bots_min_night: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        bots_max_night: {
            type: Sequelize.INTEGER,
            defaultValue: 5
        },
        bots_min_bet_night: {
            type: Sequelize.DOUBLE,
            defaultValue: 1.00
        },
        bots_max_bet_night: {
            type: Sequelize.DOUBLE,
            defaultValue: 5.00
        },
        bots_random_items_night: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        bots_random_chat_min: {
            type: Sequelize.DOUBLE,
            defaultValue: 1
        },
        bots_random_chat_max: {
            type: Sequelize.DOUBLE,
            defaultValue: 5
        },
        withdraw_commission: {
            type: Sequelize.DOUBLE,
            defaultValue: 35
        },
        bank: {
            type: Sequelize.DOUBLE,
            defaultValue: 0.00
        },
        current_profit: {
            type: Sequelize.DOUBLE,
            defaultValue: 0.00
        },
        bank_percent: {
            type: Sequelize.INTEGER,
            defaultValue: 50
        },
        min_sum_with_withdraw: {
            type: Sequelize.DOUBLE,
            defaultValue: 1.00
        },
        min_bets_with_withdraw: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        max_promocodes_day: {
            type: Sequelize.INTEGER,
            defaultValue: 2
        },
        max_buy_percent: {
            type: Sequelize.DOUBLE,
            defaultValue: 50
        },
        last_update_prices: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    });
  
    return Settings;
};