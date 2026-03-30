const Sequelize = require('sequelize');
const db = require('../config/database');

const Populationdensity = db.define('populationdensity', {
    populationdensitypersquarekilometer: {
        type: Sequelize.INTEGER
    }
});

module.exports = Populationdensity;