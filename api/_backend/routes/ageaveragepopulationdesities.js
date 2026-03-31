const express = require('express');
const router = express.Router();
const Ageaveragepopulationdesity = require('../models/Ageaveragepopulationdesity');

router.get('/', (req, res) =>
    Ageaveragepopulationdesity.findAll()
        .then(ageaveragepopulationdesitys => {
            res.json(ageaveragepopulationdesitys);
        })
        .catch(err => console.log(err)));

module.exports = router;