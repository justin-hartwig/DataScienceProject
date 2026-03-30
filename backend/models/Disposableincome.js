const Sequelize = require('sequelize');
const db = require('../config/database');

const Disposableincome = db.define('disposableincome', {
    disposableincome: {
        type: Sequelize.INTEGER
    }
});

module.exports = Disposableincome;