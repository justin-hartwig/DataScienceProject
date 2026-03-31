const Sequelize = require('sequelize');
const db = require('../config/database');

const Simulationhousingmarket = db.define('simulationhousingmarket', {
    year: {
        type: Sequelize.INTEGER
    },
    newappartmentsper1000citizens: {
        type: Sequelize.FLOAT
    }
}, {
    tableName: 'Simulationhousingmarkets',
    freezeTableName: true,
    timestamps: false
});

module.exports = Simulationhousingmarket;