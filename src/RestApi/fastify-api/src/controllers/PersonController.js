const boom = require('boom');
const Person = require('../models/Person');

const getPeople = async (req, res) => {
  try {
    const people = await Person.find();
    return people;
  } catch (err) {
    throw boom.boomify(err);
  }
};

const getSinglePerson = async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);
    return person;
  } catch (error) {
    throw boom.boomify(error);
  }
};

const addPerson = async (req, res) => {
  try {
    const person = new Person(req.body);
    return person.save();
  } catch (error) {
    throw boom.boomify(err);
  }
};

const updatePerson = async (req, res) => {
  try {
    const id = req.params.id;
    const person = req.body;
    const { ...updateData } = person;
    const update = await Person.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

const deletePerson = async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findByIdAndRemove(id);
    return person;
  } catch (error) {
    throw boom.boomify(err);
  }
};

module.exports = {
  getPeople,
  getSinglePerson,
  addPerson,
  updatePerson,
  deletePerson
};
