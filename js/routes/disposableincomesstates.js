const express = require('express');
const router = express.Router();
const Disposableincomesstate = require('../models/Disposableincomesstate');

router.get('/', (req, res) =>
    Disposableincomesstate.findAll()
        .then(counties => {
            res.json(counties);
        })
        .catch(err => console.log(err)));

module.exports = router;