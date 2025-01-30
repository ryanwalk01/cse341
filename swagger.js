const router = require('express').Router();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API to Manage MongoDB contacts'
    },
    host: 'localhost:8080',
    schemes: ['http'],
    basePath: '/contacts'
};

const outputFile = './swagger.json';
const routes = ['./routes/contacts.js'];

swaggerAutogen(outputFile, routes, doc);

