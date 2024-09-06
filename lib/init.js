const fs = require('fs');
const path = require('path');

const ncp = require('ncp').ncp;

const TEMPLATE_DIR = path.resolve(__dirname, '../templates/basic');

const copyTemplateFiles = (projectPath) => {
  return new Promise((resolve, reject) => {
    ncp(TEMPLATE_DIR, projectPath, { clobber: false }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const createProject = async (projectName) => {
  const projectPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Directory ${projectName} already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath, { recursive: true });
  console.log(`Creating project in ${projectPath}`);

  try {
    await copyTemplateFiles(projectPath);
    console.log(`Project created successfully in ${projectPath}`);
  } catch (error) {
    console.error(`Failed to create project: ${error.message}`);
    process.exit(1);
  }
};

module.exports = createProject;
