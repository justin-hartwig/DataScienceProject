const Sequelize = require('sequelize');
const db = require('../config/database');

const Rentalpricesstate = db.define('rentalpricesstate', {
    state: {
        type: Sequelize.STRING
    },
    pricepersquaremeters: {
        type: Sequelize.FLOAT
    }
}, {
    tableName: 'Rentalpricesstates',
    freezeTableName: true,
    timestamps: false
});

module.exports = Rentalpricesstate;