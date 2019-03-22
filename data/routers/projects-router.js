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

// U - Update
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        if (!name || !description) {
            res.status(400).json({ message: "A project name and description are both required" });
        } else {
            const updateProject = await Projects.update(id, req.body);
            if (!updateProject) {
                res.status(404).json({ error: "That project id can not be found" });
            } else {
                res.status(200).json(updateProject);
            }
        }
    } catch {
        res.status(500).json({ error: "Could not update project" });
    }
})

module.exports = router;