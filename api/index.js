const express = require('express');
const app = express();
const router = express.Router(); 

// Datenbank verbinden
const db = require('../backend/config/database');
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
app.use('/api/counties', require('../backend/routes/counties'));
app.use('/api/rentalprices', require('../backend/routes/rentalprices'));
app.use('/api/landprices', require('../backend/routes/landprices'));
app.use('/api/disposableincomes', require('../backend/routes/disposableincomes'));
app.use('/api/populationdensities', require('../backend/routes/populationdensities'));
app.use('/api/unemploymentrates', require('../backend/routes/unemploymentrates'));
app.use('/api/leasureperareas', require('../backend/routes/leasureperareas'));
app.use('/api/simulationhousingmarkets', require('../backend/routes/simulationhousingmarkets'));
app.use('/api/rentalpricesstates', require('../backend/routes/rentalpricesstates'));
app.use('/api/disposableincomesstates', require('../backend/routes/disposableincomesstates'));
app.use('/api/ageaveragepopulationdesities', require('../backend/routes/ageaveragepopulationdesities'));
app.use('/api/countiestop10s', require('../backend/routes/countiestop10s'));
app.use('/api/bavariaincomeprognoses', require('../backend/routes/bavariaincomeprognoses'));
app.use('/api/countyrentalpriceimpacts', require('../backend/routes/countyrentalpriceimpacts'));
app.use('/api/anomaliescounties', require('../backend/routes/anomaliescounties'));

app.use('/api', router); 
app.use('/', router);

module.exports = app;