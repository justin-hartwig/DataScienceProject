const Sequelize = require('sequelize');
const db = require('../config/database');

const Countyrentalpriceimpact = db.define('countyrentalpriceimpact', {
    impact: {
        type: Sequelize.FLOAT
    },
    adjacentcounties: {
        type: Sequelize.STRING
    }
});

module.exports = Countyrentalpriceimpact;