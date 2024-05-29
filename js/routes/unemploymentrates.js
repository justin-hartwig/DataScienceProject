const express = require('express');
const router = express.Router();
const Unemploymentrate = require('../models/Unemploymentrate');

router.get('/', (req, res) =>
    Unemploymentrate.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;