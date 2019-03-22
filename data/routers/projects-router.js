const express = require('express');

const router = express.Router();

const Projects = require('../helpers/projectModel');


// api/projects

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

// api/projects/:id/actions

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    Projects.getProjectActions(id)
    .then(actions => {
        if (actions.length > 0) {
            res.status(200).json(actions);
        } else {
            res.status(404).json({error: "That project can not be found" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The actions for this project could not be found" })
    })
})

// api/projects/:id

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

// D - Delete
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Projects.get(id)
        .then(project => {
            if (project) {
                const projActions = Projects.getProjectActions(id);
            for (let i = 0; i < projActions.length; i++) {
                Actions.remove(projActions[i].id)
                .then(deleted => {
                    if (deleted === 1) {
                        return res.status(204).end();
                    }
                })
            }
            Projects.remove(id)
            .then(deleted => {
                if (deleted === 1) {
                    return res.status(204).end();
                }
            })
        } 
        }).catch(err => {  
            res.status(404).json({error: "That project can not be found" })
        })
    } catch {
        res.status(500).json({error: "Could not delete the project"})
    }
})

module.exports = router;