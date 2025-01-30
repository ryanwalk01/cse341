const router = require('express').Router();
const contactsController = require('../controllers/contacts');
router.get('/all', contactsController.allContacts);
router.get('/byId/:id', contactsController.getContactById);
router.post('/create', contactsController.createContact);
router.put('/update/:id', contactsController.updateContact);
router.delete('/delete/:id', contactsController.deleteContact);

module.exports = router;
