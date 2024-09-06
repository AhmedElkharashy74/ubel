
# UBEL Framework

ubel is a backend framework based on Express, designed to function as a boilerplate to streamline the development of web applications. It includes built-in features for generating Mongoose schemas, controllers, and routes. ubel also facilitates the setup of authentication and authorization systems and provides a pre-defined file structure for easy project management.

## Features

- **Mongoose Schema Generator**: Automatically create schemas with one command.
- **Controller and Routes Generator**: Quickly generate RESTful controllers and routes.
- **Authentication System**: Build an entire authentication system with a single command.
- **Authorization**: Includes protected routes to manage access control.
- **File Structure**: Pre-defined boilerplate for organizing your project efficiently.

## Installation

1. Clone the repository:

   \`\`\`bash
   npm install ubel
   \`\`\`

2. Navigate to the project directory:

   \`\`\`bash
   cd ubel-project
   \`\`\`

3. Install dependencies:

   \`\`\`bash
   npm install
   \`\`\`

## Commands

### 1. Generate Mongoose Schema, Controller, and Routes

ubel provides a command to quickly create Mongoose schemas, controllers, and routes based on the object properties you specify.


**Example:**

\`\`\`bash
ubel reelseiden user atribute:mongooseSchema type (string, number,date)
\`\`\`

This command generates:
- `User` Mongoose schema
- User controller
- RESTful routes for the User model

### 2. Generate Authentication System

ubel can generate a complete authentication system using the following command:

\`\`\`bash
ubel sorganeil
\`\`\`

This command will:
- Create a `User` model with properties such as `first_name`, `last_name`, `email`, `password`, `phone`, `status`, and `role`.
- Generate an authentication controller with routes (login, register, etc.).
- Set up JWT-based authentication for the project.

## File Structure

The framework provides a well-organized file structure to keep your project modular and easy to navigate. Here's an example:

\`\`\`
ubel-framework/
│
|
├── models/
├── controllers/
├── routes/
├── middlewares/
|── config/
|── app.js
|── .env
│
└── README.md
\`\`\`

## Usage

### ubel Create Project

To create a new project using ubel, follow these steps:

1. Run the `generate` command to create Mongoose models, controllers, and routes:

   \`\`\`bash
   ubel generate objectname propertyName:propertyType
   \`\`\`

2. If your project requires authentication, run the following command to set up the authentication system:

   \`\`\`bash
   ubel sorganeil
   \`\`\`

   This will copy authentication system files into your `src` directory.

3. Customize the generated files based on your project requirements.

### Authentication and Authorization

After generating the authentication system, you will have access to several endpoints:

- **Register**: `/api/register`
- **Login**: `/api/login`
- **Protected Routes**: Use middleware to protect routes based on user roles and permissions.

## Requirements

- Node.js (v14+)
- MongoDB
- Express
- Mongoose

## Contributing

Contributions are welcome! If you would like to contribute to the ubel framework, feel free to submit pull requests or open issues.
