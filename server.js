const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(bodyParser.json());
app.use('/', require('./routes'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to MongoDB and listening on port ${port}`);
  }
});
