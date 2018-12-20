const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  address: String,
  age: Number,
  from: String
});

module.exports = mongoose.model('Person', personSchema);
