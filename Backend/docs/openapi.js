const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Seminararbeit API',
      version: '1.0.0',
      description: 'API documentation for the Seminararbeit backend'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local server' }
    ]
  },
  // Paths to files containing OpenAPI definitions in JSDoc (we can point to routes and controllers)
  apis: [
    './routes/*.js',
    './controllers/*.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
