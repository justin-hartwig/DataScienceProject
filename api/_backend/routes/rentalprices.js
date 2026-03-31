const express = require('express');
const router = express.Router();
const Rentalprice = require('../models/Rentalprice');

router.get('/', (req, res) =>
    Rentalprice.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;