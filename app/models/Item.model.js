module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        market_hash_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        exterior: {
            type: Sequelize.STRING
        },
        classid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        rarity: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false
        },
        is_stattrak: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    });
  
    return Item;
};