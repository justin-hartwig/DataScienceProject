const express = require('express');
const router = express.Router();
const Anomaliescounties = require('../models/Anomaliescounties');

router.get('/', (req, res) =>
    Anomaliescounties.findAll()
        .then(anomaliescounties => {
            res.json(anomaliescounties);
        })
        .catch(err => console.log(err)));

module.exports = router;