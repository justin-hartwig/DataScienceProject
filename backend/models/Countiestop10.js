const Sequelize = require('sequelize');
const db = require('../config/database');

const Countiestop10 = db.define('countiestop10', {
    county: {
        type: Sequelize.STRING
    },
    disposableincome: {
        type: Sequelize.INTEGER
    },
    percentageleasureperarea: {
        type: Sequelize.FLOAT
    },
    pricepersquaremeters: {
        type: Sequelize.FLOAT
    },
    unemploymentrate: {
        type: Sequelize.FLOAT
    }
});

module.exports = Countiestop10;