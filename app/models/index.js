const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: 5433,
  dialect: dbConfig.dialect,
  logging: (...msg) => console.log(msg),
  

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
db.privilege = require("./Privilege.model.js")(sequelize, Sequelize);
db.authProvider = require("./AuthProvider.model.js")(sequelize, Sequelize);

module.exports = db;