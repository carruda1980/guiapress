const Sequelize = require("sequelize");

const connection = new Sequelize(
    "guiapress",
    "root",
    "Root@2020",
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = connection