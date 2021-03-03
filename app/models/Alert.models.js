module.exports = (sequelize, Sequelize) => {
    const Alert = sequelize.define("alert", {
        ru: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        en: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
  
    return Alert;
};