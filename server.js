const express = require('express');
const helmet = require('helmet');

const server = express();

const projectsRouter = require('./data/routers/projects-router.js');
const actionsRouter = require('./data/routers/actions-router.js');


server.use(express.json());
server.use(helmet());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);


module.exports = server;