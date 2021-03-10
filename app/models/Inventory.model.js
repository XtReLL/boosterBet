const User = require('./User.model');
const Item = require('./Item.model');

module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventory", {
        userId: {
            type: Sequelize.INTEGER,
            references: {
              model: User, 
              key: 'id'
            }
          },
        itemId: {
            type: Sequelize.INTEGER,
            references: {
              model: Item, 
              key: 'id'
            }
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
  
    return Inventory;
};