const Sequelize = require('sequelize');
const db = require('../config/database');

const County = db.define('county', {
    name: {
        type: Sequelize.STRING
    },
    federalstate: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'Counties',
    freezeTableName: true,
    timestamps: false
});

module.exports = County;