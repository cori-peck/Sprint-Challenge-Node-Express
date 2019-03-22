const express = require('express');

const router = express.Router();

const Actions = require('../helpers/actionModel');


router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch {
        console.log(err);
        res.status(500).json({ message: "Cannot get actions"})
    }
})


module.exports = router