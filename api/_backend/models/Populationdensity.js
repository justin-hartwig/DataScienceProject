const Sequelize = require('sequelize');
const db = require('../config/database');

const Populationdensity = db.define('populationdensity', {
    populationdensitypersquarekilometer: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'Populationdensities',
    freezeTableName: true,
    timestamps: false
});

module.exports = Populationdensity;