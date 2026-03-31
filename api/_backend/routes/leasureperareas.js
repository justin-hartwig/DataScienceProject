const express = require('express');
const router = express.Router();
const Leasureperarea = require('../models/Leasureperarea');

router.get('/', (req, res) =>
    Leasureperarea.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;