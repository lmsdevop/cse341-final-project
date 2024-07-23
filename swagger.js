const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Prime Autodocs API',
        description: 'This is a api to use to handle with clients, orders and vehicle'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
}

const outputFile = './swagger.json';
const endpoinstFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpoinstFiles, doc);