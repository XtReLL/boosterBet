const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: 5433,
  dialect: dbConfig.dialect,
  

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.model.js")(sequelize, Sequelize);
db.alert = require("./Alert.model.js")(sequelize, Sequelize);
db.item = require("./Item.model.js")(sequelize, Sequelize);
db.role = require("./Role.model.js")(sequelize, Sequelize);
db.inventory = require("./Inventory.model.js")(sequelize, Sequelize);
db.authProvider = require("./AuthProvider.model.js")(sequelize, Sequelize);
db.payment = require("./Payment.model.js")(sequelize, Sequelize);
db.settings = require("./Settings.model.js")(sequelize, Sequelize);

/*USER_ROLE start*/
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
/*USER_ROLE end*/

/*INVENTORY start*/
db.item.belongsToMany(db.user, { through: db.inventory });
db.user.belongsToMany(db.item, { through: db.inventory });
/*INVENTORY end*/

/*Payment One-To-Many start*/
db.user.hasMany(db.payment, {
  foreignKey: "userId"
});
db.item.hasMany(db.payment, {
  foreignKey: "itemId"
});
/*Payment One-To-Many end*/

module.exports = db;