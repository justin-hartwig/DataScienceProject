const Sequelize = require('sequelize');
const db = require('../config/database');

const Disposableincome = db.define('disposableincome', {
    disposableincome: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'Disposableincomes',
    freezeTableName: true,
    timestamps: false
});

module.exports = Disposableincome;