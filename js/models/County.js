const Sequelize = require('sequelize');
const db = require('../config/database');

const County = db.define('county', {
    name: {
        type: Sequelize.STRING
    },
    federalstate: {
        type: Sequelize.STRING
    }
});

module.exports = County;