const express = require('express');
const router = express.Router();
const County = require('../models/County');

router.get('/', (req, res) =>
    County.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;