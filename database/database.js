const Sequelize = require("sequelize");

const connection = new Sequelize(
    "guiapress",
    "root",
    "Root@2020",
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection