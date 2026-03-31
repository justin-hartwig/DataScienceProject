const Sequelize = require('sequelize');
const db = require('../config/database');

const Bavariaincomeprognoses = db.define('bavariaincomeprognoses', {
    year: {
        type: Sequelize.INTEGER
    },
    income: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'Bavariaincomeprognoses',
    freezeTableName: true,
    timestamps: false
});


module.exports = Bavariaincomeprognoses;