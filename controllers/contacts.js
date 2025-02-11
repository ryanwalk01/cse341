const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const allContacts = async (req, res, next) => {
  /*
  #swagger.summary = 'Get all contacts'
  */
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getContactById = async (req, res, next) => {
  /*
#swagger.summary = 'Get contact ID'
*/
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });
    if (!result) {
      res.status(500).json({ message: 'Contact not found' });
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    /*
    #swagger.summary = 'Create new contact' 
    #swagger.parameters['Contact JSON'] = {
        in: 'body',
        description: 'New contact information',
        required: true,
        type: 'object'
      } 
    */
    const newContact = req.body;
    if (!newContact) {
      res.status(500).json({ message: 'Invalid request' });
    };

    const parameters = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
    for (let i = 0; i < parameters.length; i++) {
      if (!newContact.parameters[i]) {
        res.status(500).json({ message: parameters[i] + ' is required' });
      };
    };

    const result = await mongodb.getDb().db().collection('contacts').insertOne(newContact);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateContact = async (req, res, next) => {
  /* 
  #swagger.summary = 'Update contact by ID'
  #swagger.parameters['Contact JSON'] = {
    in: 'body',
    description: 'New contact information',
    required: true,
    type: 'object'
  } 
  */
  try {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = req.body;

    if (!updatedContact) {
      res.status(500).json({ message: 'Invalid request' });
    };
    const result = await mongodb.getDb().db().collection('contacts').updateOne({ _id: contactId }, { $set: updatedContact });
    if (!result) {
      res.status(500).json({ message: 'Contact not found' });
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(204).json(result);
  }
  catch (error) {
    res.status(500).json({ message: 'Contact not found' });
  }
};

const deleteContact = async (req, res, next) => {
  /*
  #swagger.summary = 'Delete contact by ID'
  */
  try {
    const contactId = new ObjectId(req.params.id);
    if (!contactId) {
      res.status(500).json({ message: 'Please include the ID of the contact you would like to delete.' });
    }
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });
    if (!result) {
      res.status(500).json({ message: 'Contact not found' });
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Contact not found' });
  }
};

module.exports = { allContacts, getContactById, createContact, updateContact, deleteContact };
