const express = require('express');

const router = express.Router();

const Actions = require('../helpers/actionModel');
const Projects = require('../helpers/projectModel');


// C - Create
router.post('/', async (req, res) => {
    try {
        const { project_id, description, notes } = req.body;
        if (!project_id || !description || !notes ) {
            res.status(400).json({ message: "Action must have a project id, a description AND notes" });
        } else {
             await Projects.get(project_id)
             .then (project => {
                 if (project) {
                     Actions.insert(req.body)
                     .then(action => {
                         return res.status(201).json(action);
                     })
                 }
            }) .catch(err => {
                res.status(404).json({ message: "That project id can not be found" })
            })
        }
    } catch {
        res.status(500).json({ error: "Could not add the action" });
    }
})

// R - Read
router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch {
        console.log(err);
        res.status(500).json({ message: "Cannot get actions"})
    }
})

// U - Update
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { project_id, description, notes } = req.body;
        if(!project_id || !description || !notes) {
            res.status(400).json({message: "Action must have a project id, a description AND notes" })
        } else {
            const updateAction = await Actions.update(id, req.body);
            if (!updateAction) {
                res.status(404).json({ error: "That action id can not be found" })
            } else {
                res.status(200).json(updateAction);
            }
        }
    } catch {
        res.status(500).json({ error: "Could not update action"})
    }
})

module.exports = router