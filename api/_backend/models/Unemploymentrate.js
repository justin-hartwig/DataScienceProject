const Sequelize = require('sequelize');
const db = require('../config/database');

const Unemploymentrate = db.define('unemploymentrate', {
    unemploymentrate: {
        type: Sequelize.FLOAT
    }
}, {
    tableName: 'Unemploymentrates',
    freezeTableName: true,
    timestamps: false
});

module.exports = Unemploymentrate;