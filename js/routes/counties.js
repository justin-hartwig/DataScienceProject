const express = require('express');
const router = express.Router();
const db = require('../config/database');
const County = require('../models/County');

router.get('/', (req, res) => 
    County.findAll()
      .then(counties => {
        console.log(counties);
        res.sendStatus(200);
      })
      .catch(err => console.log(err)));

module.exports = router;