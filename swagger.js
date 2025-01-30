const router = require('express').Router();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API to Manage MongoDB contacts'
    },
    host: 'cse341-ryan.onrender.com',
    schemes: ['https'],
    basePath: '/contacts'
};

const outputFile = './swagger.json';
const routes = ['./routes/contacts.js'];

swaggerAutogen(outputFile, routes, doc);

