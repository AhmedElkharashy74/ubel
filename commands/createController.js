const fs = require('fs');
const path = require('path');

function createController(name, properties) {
    const schemaName = name.charAt(0).toUpperCase() + name.slice(1);

    // Extract property names from the properties array
    const propList = properties.map(prop => prop.split(':')[0]);

    // Generate checks for required fields
    const requiredPropsCheck = propList.map(prop => `
        if (!${prop}) { 
            res.status(400).send('${prop} is required'); 
            return; 
        }`).join('');

    // Generate controller content
    const controllerContent = `
const mongoose = require('mongoose');
const ${schemaName} = require('../models/${name}');

// Create ${schemaName}
const create${schemaName} = async (req, res) => {
    const { ${propList.join(', ')} } = req.body;
    ${requiredPropsCheck}

    try {
        const existing${schemaName} = await ${schemaName}.findOne({ ${propList[0]} }); // Check if the first property exists
        if (existing${schemaName}) {
            return res.status(400).send('${schemaName} already exists');
        }

        const new${schemaName} = new ${schemaName}({
            ${propList.join(',\n            ')}
        });
        await new${schemaName}.save();
        res.status(201).send(new${schemaName});
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Read ${schemaName} with pagination and filters
const read${schemaName} = async (req, res) => {
    try {
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Validate page and limit
        if (page < 1 || limit < 1) {
            return res.status(400).send({ error: 'Page and limit must be positive integers' });
        }

        // Build query and sort options
        let query = {};
        let sort = {};

        ${propList.map(prop => `
        if (req.query.${prop}) {
            query.${prop} = req.query.${prop};
        }`).join('')}

        if (req.query.sort === 'asc') {
            sort._id = 1;
        } else if (req.query.sort === 'desc') {
            sort._id = -1;
        }

        // Fetch ${name}s with pagination
        const items = await ${schemaName}.find(query).sort(sort).skip((page - 1) * limit).limit(limit);
        const totalItems = await ${schemaName}.countDocuments(query);

        res.status(200).send({
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            items
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Update ${schemaName}
const update${schemaName} = async (req, res) => {
    const { id } = req.params;
    try {
        const updated${schemaName} = await ${schemaName}.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated${schemaName}) {
            res.status(404).send({ error: '${schemaName} not found' });
        } else {
            res.status(200).send(updated${schemaName});
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Delete ${schemaName}
const delete${schemaName} = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid ID format' });
    }
    try {
        const deleted${schemaName} = await ${schemaName}.findByIdAndDelete(id);
        if (!deleted${schemaName}) {
            return res.status(404).send({ error: '${schemaName} not found' });
        }
        res.status(200).send({ message: '${schemaName} deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = {
    create${schemaName},
    read${schemaName},
    update${schemaName},
    delete${schemaName}
};
`;

    // Write the controller to a file
    const controllersDir = path.join('controllers');
    if (!fs.existsSync(controllersDir)) {
        fs.mkdirSync(controllersDir);
    }
    fs.writeFileSync(path.join(controllersDir, `${name}Controller.js`), controllerContent.trim());
    console.log(`Created ${name}Controller.js`);
}

module.exports = createController;
