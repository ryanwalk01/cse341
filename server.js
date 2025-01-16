var express = require('express');
require('dotenv').config();
var app = express();
const port = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

console.log('MongoDB URI:', process.env.MONGO_URI);

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to MongoDB and listening on port ${port}`);
    }
});
