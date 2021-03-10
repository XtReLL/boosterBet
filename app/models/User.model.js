module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        email: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING,
        },
        steamId: {
            type: Sequelize.INTEGER,
        },
        tradeLink: {
            type: Sequelize.INTEGER
        },
        balance: {
            type: Sequelize.INTEGER
        }
    });
  
    return User;
};