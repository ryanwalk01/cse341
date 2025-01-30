const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const allContacts = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const newContact = req.body;
    const result = await mongodb.getDb().db().collection('contacts').insertOne(newContact);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = req.body;
    const result = await mongodb.getDb().db().collection('contacts').updateOne({ _id: contactId }, { $set: updatedContact });
    res.setHeader('Content-Type', 'application/json');
    res.status(204).json(result);
  }
  catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { allContacts, getContactById, createContact, updateContact, deleteContact };
