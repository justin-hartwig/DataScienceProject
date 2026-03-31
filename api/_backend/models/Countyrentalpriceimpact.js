const Sequelize = require('sequelize');
const db = require('../config/database');

const Countyrentalpriceimpact = db.define('countyrentalpriceimpact', {
    impact: {
        type: Sequelize.FLOAT
    },
    adjacentcounties: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'Countyrentalpriceimpacts',
    freezeTableName: true,
    timestamps: false
});

module.exports = Countyrentalpriceimpact;