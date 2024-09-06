const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const program = new Command();

function createRoutes(name) {
    const schemaName = name.charAt(0).toUpperCase() + name.slice(1);
    const routeContent = `
    const express = require('express');
    const router = express.Router();
    const ${schemaName}Controller = require('../controllers/${name}Controller');
  
    router.post('/', ${schemaName}Controller.create${schemaName});
    router.get('/', ${schemaName}Controller.read${schemaName});
    router.put('/:id', ${schemaName}Controller.update${schemaName});
    router.delete('/:id', ${schemaName}Controller.delete${schemaName});
  
    module.exports = router;
    `;
  
    fs.writeFileSync(path.join('routers', `${name}Routes.js`), routeContent.trim());
    console.log(`Created ${name}Routes.js`);
  }

module.exports = createRoutes