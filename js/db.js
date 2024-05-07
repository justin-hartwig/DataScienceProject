let db;

(function() {
    const Sequelize = require('sequelize');
    require('dotenv').config({path:'./.env'})

    module.exports.initializeDb = function() {
        db = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: process.env.DB_DIALECT,
                dialectOptions: {
                    ssl: {
                      require: true, // This will help you. But you will see nwe error
                      rejectUnauthorized: false // This line will fix new error
                    }
                  },
    
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
        )
    
        authenticate();
    }

}());

async function authenticate() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}