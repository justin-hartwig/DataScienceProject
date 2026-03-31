const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname, '../public'), {
    extensions: ['html']
}));

app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', env: process.env.VERCEL ? 'production' : 'local' });
});

const db = require('../backend/config/database');
db.authenticate()
    .then(() => console.log('✅ Datenbank-Verbindung steht!'))
    .catch(err => console.error('❌ Datenbank-Fehler:', err.message));

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

if (!process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`\n🚀 SERVER GESTARTET!`);
        console.log(`👉 Öffne: http://localhost:${PORT}\n`);
    });
}

module.exports = app;