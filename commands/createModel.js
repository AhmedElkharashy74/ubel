const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const program = new Command();


function createModel(name, fields) {
    const schemaName = name.charAt(0).toUpperCase() + name.slice(1);
    const fieldsStr = fields.map(field => {
      const [fieldName, fieldType] = field.split(':');
      return `${fieldName}: { type: ${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}, required: true }`;
    }).join(',\n  ');
  
    const schemaContent = `
    const mongoose = require('mongoose');
  
    const ${schemaName}Schema = new mongoose.Schema({
      ${fieldsStr}
    },
    {timestamps : true}
    );
  
    module.exports = mongoose.model('${schemaName}', ${schemaName}Schema);
    `;
  
    fs.writeFileSync(path.join('models', `${name}.js`), schemaContent.trim());
    console.log(`Created ${name}.js model`);
  }

module.exports = createModel