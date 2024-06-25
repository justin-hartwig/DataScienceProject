// Import essential libraries 
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

//Static file serving
app.use(express.static(path.join(__dirname, '..')));

// Page Routes 
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

router.get('/app', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'app.html'));
});

router.get('/impressum', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'impressum.html'));
});

async function authenticate() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Database
const db = require('./config/database');
authenticate();

// Database Routes
app.use('/counties', require('./routes/counties'));
app.use('/rentalprices', require('./routes/rentalprices'));
app.use('/landprices', require('./routes/landprices'));
app.use('/disposableincomes', require('./routes/disposableincomes'));
app.use('/populationdensities', require('./routes/populationdensities'));
app.use('/unemploymentrates', require('./routes/unemploymentrates'));
app.use('/leasureperareas', require('./routes/leasureperareas'));
app.use('/simulationhousingmarkets', require('./routes/simulationhousingmarkets'));
app.use('/rentalpricesstates', require('./routes/rentalpricesstates'));
app.use('/disposableincomesstates', require('./routes/disposableincomesstates'));
app.use('/ageaveragepopulationdesities', require('./routes/ageaveragepopulationdesities'));
app.use('/countiestop10s', require('./routes/countiestop10s'));
app.use('/bavariaincomeprognoses', require('./routes/bavariaincomeprognoses'));
app.use('/countyrentalpriceimpacts', require('./routes/countyrentalpriceimpacts'));
app.use('/anomaliescounties', require('./routes/anomaliescounties'));

//add the router 
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Server Started');