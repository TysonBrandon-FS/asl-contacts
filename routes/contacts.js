const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get('/', contactsController.getAllContacts);
router.post('/', contactsController.createContact);
router.get('/:id', contactsController.getContactById);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router; 