const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
    db
    .get()
    .then(proj => {
        res.status(200).json(proj);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json('error: Can not get projects');
    })
})

module.exports = router;