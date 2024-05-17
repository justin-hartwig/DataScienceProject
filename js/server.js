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

router.get('/explore', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'explore.html'));
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

//add the router 
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Server Started'); 