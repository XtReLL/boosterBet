module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        market_hash_name: {
            type: Sequelize.STRING
        },
        appId: {
            type: Sequelize.INTEGER
        },
        assetId: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        exterior: {
            type: Sequelize.STRING
        },
        classid: {
            type: Sequelize.STRING
        },
        rarity: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING
        },
        is_stattrak: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        price: {
            type: Sequelize.DOUBLE,
            defaultValue: 0.00
        },
    });
  
    return Item;
};