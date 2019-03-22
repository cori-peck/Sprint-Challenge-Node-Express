const express = require('express');

const router = express.Router();

const Projects = require('../helpers/projectModel');


//C - Create
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name || !description) {
            res.status(400).json({message: "A project name and description are both required" });
        } else {
            const newProject = await Projects.insert(req.body)
            res.status(201).json(newProject);
        }
    } catch {
        res.status(500).json({ error: "Cannot add Project" });
    }
})


// R - Read
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch {
        res.status(500).json({ error: "Cannot get projects" });
    }
})

module.exports = router;