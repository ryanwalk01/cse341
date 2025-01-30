const router = require('express').Router();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API to Manage MongoDB contacts'
    },
    host: 'https://cse341-ryan.onrender.com:8080',
    schemes: ['http'],
    basePath: '/contacts'
};

const outputFile = './swagger.json';
const routes = ['./routes/contacts.js'];

swaggerAutogen(outputFile, routes, doc);

