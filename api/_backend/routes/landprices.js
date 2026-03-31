const express = require('express');
const router = express.Router();
const Landprice = require('../models/Landprice');

router.get('/', (req, res) =>
    Landprice.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;