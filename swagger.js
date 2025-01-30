const router = require('express').Router();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: 'localhost:8080',
    schemes: ['http']
};

const outputFile = './swagger.json';
const routes = ['./routes/contacts.js'];

swaggerAutogen(outputFile, routes, doc);

