const express = require('express');
const router = express.Router();
const Countiestop10 = require('../models/Countiestop10');

router.get('/', (req, res) =>
    Countiestop10.findAll()
        .then(countiestop10s => {
            res.json(countiestop10s);
        })
        .catch(err => console.log(err)));

module.exports = router;