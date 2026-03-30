const Sequelize = require('sequelize');
const db = require('../config/database');

const Simulationhousingmarket = db.define('simulationhousingmarket', {
    year: {
        type: Sequelize.INTEGER
    },
    newappartmentsper1000citizens: {
        type: Sequelize.FLOAT
    }
});

module.exports = Simulationhousingmarket;