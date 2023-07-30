const {
    Sequelize
} = require("sequelize");
const config = require('./config/config');
let sequelize = new Sequelize({
    host: config.development.host,
    username: config.development.username,
    password: config.development.password,
    port: config.development.port,
    database: config.development.database,
    dialect: config.development.dialect,
});
module.exports = sequelize;