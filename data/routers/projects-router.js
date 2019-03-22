const express = require('express');

const router = express.Router();

const Projects = require('../helpers/projectModel');


router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch {
        res.status(500).json({ error: "Cannot get projects" });
    }
})

module.exports = router;