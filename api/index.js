const express = require('express');
const app = express();

// Datenbank verbinden
const db = require('./config/database');
async function authenticate() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
authenticate();

// Database Routes
app.use('/api/counties', require('./routes/counties'));
app.use('/api/rentalprices', require('./routes/rentalprices'));
app.use('/api/landprices', require('./routes/landprices'));
app.use('/api/disposableincomes', require('./routes/disposableincomes'));
app.use('/api/populationdensities', require('./routes/populationdensities'));
app.use('/api/unemploymentrates', require('./routes/unemploymentrates'));
app.use('/api/leasureperareas', require('./routes/leasureperareas'));
app.use('/api/simulationhousingmarkets', require('./routes/simulationhousingmarkets'));
app.use('/api/rentalpricesstates', require('./routes/rentalpricesstates'));
app.use('/api/disposableincomesstates', require('./routes/disposableincomesstates'));
app.use('/api/ageaveragepopulationdesities', require('./routes/ageaveragepopulationdesities'));
app.use('/api/countiestop10s', require('./routes/countiestop10s'));
app.use('/api/bavariaincomeprognoses', require('./routes/bavariaincomeprognoses'));
app.use('/api/countyrentalpriceimpacts', require('./routes/countyrentalpriceimpacts'));
app.use('/api/anomaliescounties', require('./routes/anomaliescounties'));


module.exports = app;