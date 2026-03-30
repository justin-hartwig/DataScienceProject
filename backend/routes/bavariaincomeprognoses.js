const express = require('express');
const router = express.Router();
const Bavariaincomeprognoses = require('../models/Bavariaincomeprognoses');

router.get('/', (req, res) =>
    Bavariaincomeprognoses.findAll()
        .then(bavariaincomeprognoses => {
            res.json(bavariaincomeprognoses);
        })
        .catch(err => console.log(err)));

module.exports = router;