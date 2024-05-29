const express = require('express');
const router = express.Router();
const Populationdensity = require('../models/Populationdensity');

router.get('/', (req, res) =>
    Populationdensity.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;