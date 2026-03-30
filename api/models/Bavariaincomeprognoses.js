const Sequelize = require('sequelize');
const db = require('../config/database');

const Bavariaincomeprognoses = db.define('bavariaincomeprognoses', {
    year: {
        type: Sequelize.INTEGER
    },
    income: {
        type: Sequelize.INTEGER
    }
});

module.exports = Bavariaincomeprognoses;