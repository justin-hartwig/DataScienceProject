const express = require('express');
const router = express.Router();
const Simulationhousingmarket = require('../models/Simulationhousingmarket');

router.get('/', (req, res) =>
    Simulationhousingmarket.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;