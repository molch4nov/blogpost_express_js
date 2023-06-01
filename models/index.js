const config = require("../db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.pool.database,
    config.pool.user,
    config.pool.password,
    {
        host: config.pool.host,
        dialect: 'postgres',
        operatorsAliases: false
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);

module.exports = db;