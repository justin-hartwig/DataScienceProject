const Sequelize = require('sequelize');
const db = require('../config/database');

const Rentalprice = db.define('rentalprice', {
    numberofoffersanalysed: {
        type: Sequelize.INTEGER
    },
    pricepersquaremeters: {
        type: Sequelize.FLOAT
    }
}, {
    tableName: 'Rentalprices',
    freezeTableName: true,
    timestamps: false
});

module.exports = Rentalprice;