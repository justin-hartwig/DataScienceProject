const express = require('express');
const router = express.Router();
const Countyrentalpriceimpact = require('../models/Countyrentalpriceimpact');

router.get('/', (req, res) =>
    Countyrentalpriceimpact.findAll()
        .then(countyrentalpriceimpacts => {
            res.json(countyrentalpriceimpacts);
        })
        .catch(err => console.log(err)));

module.exports = router;