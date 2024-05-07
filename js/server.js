// Import essential libraries 
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const db = require('./db');

//Static file serving
app.use(express.static(path.join(__dirname, '..')));

// Setup essential routes 
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

//Initalize DB
db.initializeDb();

//add the router 
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Server Started'); 