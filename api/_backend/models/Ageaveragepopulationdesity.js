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
}, {
    tableName: 'Ageaveragepopulationdesities',
    freezeTableName: true,
    timestamps: false
});

module.exports = Ageaveragepopulationdesity;