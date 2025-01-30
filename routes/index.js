const router = require('express').Router();

const myController = require('../controllers');

router.get('/', myController.nameFunction);

router.use('/contacts', require('./contacts'));

router.use('/api-docs', require('./swagger'));

module.exports = router;
