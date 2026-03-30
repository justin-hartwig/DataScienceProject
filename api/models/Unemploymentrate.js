const Sequelize = require('sequelize');
const db = require('../config/database');

const Unemploymentrate = db.define('unemploymentrate', {
    unemploymentrate: {
        type: Sequelize.FLOAT
    }
});

module.exports = Unemploymentrate;