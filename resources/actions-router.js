const express = require('express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel');
const projDB = require('../data/helpers/projectModel');


router.get('/', async (req, res) => {
    try {
        const actions = await Actions.find(req.query);
        res.status(200).json(actions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Cannot get actions"})

    }
    /*.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json('error: Can not get actions')
    })*/
})


module.exports = router