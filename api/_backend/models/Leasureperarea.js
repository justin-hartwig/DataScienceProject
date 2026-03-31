const Sequelize = require('sequelize');
const db = require('../config/database');

const Leasureperarea = db.define('leasureperarea', {
    percentageleasureperarea: {
        type: Sequelize.FLOAT
    }
}, {
    tableName: 'Leasureperareas',
    freezeTableName: true,
    timestamps: false
});

module.exports = Leasureperarea;