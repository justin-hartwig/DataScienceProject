const Sequelize = require('sequelize');
const db = require('../config/database');

const Disposableincomesstate = db.define('disposableincomesstate', {
    state: {
        type: Sequelize.STRING
    },
    disposableincome: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'Disposableincomesstates',
    freezeTableName: true,
    timestamps: false
});

module.exports = Disposableincomesstate;