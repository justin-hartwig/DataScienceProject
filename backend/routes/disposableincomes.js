const express = require('express');
const router = express.Router();
const Disposableincome = require('../models/Disposableincome');

router.get('/', (req, res) =>
    Disposableincome.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;