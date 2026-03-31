const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use((req, res, next) => {
    console.log(`Eingehender Request: ${req.method} ${req.url}`);
    next();
});

const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => {
    res.json({ 
        status: 'Server is running', 
        receivedUrl: req.url,
        env: process.env.VERCEL ? 'production' : 'local' 
    });
});

apiRouter.get('/db-test', async (req, res) => {
    try {
        await db.authenticate();
        // Wir prüfen kurz, ob wir eine Tabelle zählen können
        res.json({ 
            status: 'Database connection SUCCESS',
            message: 'Sequelize konnte sich erfolgreich verbinden.'
        });
    } catch (error) {
        console.error('DB-Test Error:', error);
        res.status(500).json({ 
            status: 'Database connection FAILED', 
            error: error.message 
        });
    }
});

apiRouter.use('/counties', require('./_backend/routes/counties'));
apiRouter.use('/rentalprices', require('./_backend/routes/rentalprices'));
apiRouter.use('/landprices', require('./_backend/routes/landprices'));
apiRouter.use('/disposableincomes', require('./_backend/routes/disposableincomes'));
apiRouter.use('/populationdensities', require('./_backend/routes/populationdensities'));
apiRouter.use('/unemploymentrates', require('./_backend/routes/unemploymentrates'));
apiRouter.use('/leasureperareas', require('./_backend/routes/leasureperareas'));
apiRouter.use('/simulationhousingmarkets', require('./_backend/routes/simulationhousingmarkets'));
apiRouter.use('/rentalpricesstates', require('./_backend/routes/rentalpricesstates'));
apiRouter.use('/disposableincomesstates', require('./_backend/routes/disposableincomesstates'));
apiRouter.use('/ageaveragepopulationdesities', require('./_backend/routes/ageaveragepopulationdesities'));
apiRouter.use('/countiestop10s', require('./_backend/routes/countiestop10s'));
apiRouter.use('/bavariaincomeprognoses', require('./_backend/routes/bavariaincomeprognoses'));
apiRouter.use('/countyrentalpriceimpacts', require('./_backend/routes/countyrentalpriceimpacts'));
apiRouter.use('/anomaliescounties', require('./_backend/routes/anomaliescounties'));

app.use('/api', apiRouter);
app.use('/', apiRouter);

app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html'] }));

if (!process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
}

module.exports = app;