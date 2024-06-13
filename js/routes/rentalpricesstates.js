const express = require('express');
const router = express.Router();
const Rentalpricesstate = require('../models/Rentalpricesstate');

router.get('/', (req, res) =>
    Rentalpricesstate.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;