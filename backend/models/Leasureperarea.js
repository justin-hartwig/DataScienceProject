const Sequelize = require('sequelize');
const db = require('../config/database');

const Leasureperarea = db.define('leasureperarea', {
    percentageleasureperarea: {
        type: Sequelize.FLOAT
    }
});

module.exports = Leasureperarea;