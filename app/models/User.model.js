module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
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
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        accessToken: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
  
    return User;
};