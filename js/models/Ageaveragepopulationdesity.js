const Sequelize = require('sequelize');
const db = require('../config/database');

const Ageaveragepopulationdesity = db.define('ageaveragepopulationdesity', {
    state: {
        type: Sequelize.STRING
    },
    ageaverage: {
        type: Sequelize.FLOAT
    },
    populationdesity: {
        type: Sequelize.FLOAT
    }
});

module.exports = Ageaveragepopulationdesity;