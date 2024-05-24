const Sequelize = require('sequelize');
const db = require('../config/database');

const Landprice = db.define('landprice', {
    pricepersquaremeters: {
        type: Sequelize.STRING
    }
});

module.exports = Landprice;