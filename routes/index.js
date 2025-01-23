const router = require('express').Router();

const myController = require('../controllers');

router.get('/', myController.nameFunction);

router.use('/contacts', require('./contacts'));

module.exports = router;
