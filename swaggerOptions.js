const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My Express API',
        version: '1.0.0',
        description: 'An example Express.js API with JWT authentication and Swagger documentation',
      },
      servers: [
        {
          url: 'http://localhost:3000', // Base URL of your API
        },
      ],
    },
    apis: ['./app.js', './routes/*.js'], // Files where Swagger-JSDoc should look for definitions
};

module.exports = swaggerOptions;
  