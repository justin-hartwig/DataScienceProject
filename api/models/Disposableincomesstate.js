const Sequelize = require('sequelize');
const db = require('../config/database');

const Disposableincomesstate = db.define('disposableincomesstate', {
    state: {
        type: Sequelize.STRING
    },
    disposableincome: {
        type: Sequelize.INTEGER
    }
});

module.exports = Disposableincomesstate;