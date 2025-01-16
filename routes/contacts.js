const router = require('express').Router();
const contactsController = require('../controllers/contacts');
router.get('/', contactsController.allContacts);
router.get('/:id', contactsController.getContactById);

module.exports = router;