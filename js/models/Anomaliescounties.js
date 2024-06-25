const Sequelize = require('sequelize');
const db = require('../config/database');

const Anomaliescounties = db.define('anomaliescounties', {
    actual: {
        type: Sequelize.FLOAT
    },
    predicted: {
        type: Sequelize.FLOAT
    },
    misclassified: {
        type: Sequelize.BOOLEAN
    },
    errortype: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    federalstate: {
        type: Sequelize.STRING
    },
});

module.exports = Anomaliescounties;