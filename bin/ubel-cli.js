#!/usr/bin/env node

const { program } = require('commander');
const create = require('../commands/create');
const createModel = require('../commands/createModel');
const createController = require('../commands/createController');
const createRoutes = require('../commands/createRoutes');
const sorganeil = require('../commands/createAuth');
program
  .version('1.0.0')
  .description('UBEL CLI: A tool to create a new UBEL project')
  .command('create <project-name>')
  .description('Create a new project')
  .action((projectName) => {
    create(projectName);
  });


  program
  .command('reelseiden <name> [fields...]')
  .description('Create a Mongoose model, controller, and routes - do not forget to add routes in app.js :3')
  .action((name, fields) => {
    createModel(name, fields);
    createController(name, fields);
    createRoutes(name);
  });


  program
  .command('sorganeil')
  .description('Generate a complete authentication system - do not forget to add the routes in app.js :3')
  .action(() => {
    sorganeil();
  });


program.parse(process.argv);
