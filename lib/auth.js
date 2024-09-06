const fs = require('fs');
const path = require('path');

const filesToCopy = [
    'models/User.js',
    'controllers/userController.js',
    'middlewares/authorize.js',
    'routers/userRoutes.js',
];

function copyAuthFiles(destinationPath) {
    filesToCopy.forEach(file => {
        const srcPath = path.join(__dirname, '../src', file);
        const destPath = path.join(destinationPath, file);

        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to ${destPath}`);
    });
    console.log('do not foprget to add the routes in app.js :3')
}



function sorganeilCommand() {
    const destinationPath = process.cwd();
    copyAuthFiles(destinationPath);
    console.log('Authentication system generated successfully! - do not foprget to add the routes in app.js :3');
}

module.exports = sorganeilCommand;
