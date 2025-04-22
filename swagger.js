const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Marketplace API',
      version: '1.0.0',
      description: 'REST API documentation for the Book Marketplace project',
    },
    servers: [
      {
        url: 'http://localhost:5001', // URL of your server
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };