const Sequelize = require('sequelize');
const db = require('../config/database');

const Landprice = db.define('landprice', {
    pricepersquaremeters: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'Landprices',
    freezeTableName: true,
    timestamps: false
});

module.exports = Landprice;