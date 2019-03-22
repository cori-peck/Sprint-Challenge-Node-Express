const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const projectsRouter = require('./resources/projects-router.js');
const actionsRouter = require('./resources/actions-router.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);


server.get ('/', (req, res) => {
    res.send(`
        <h2>Test</h2>
    `)
})


module.exports = server;