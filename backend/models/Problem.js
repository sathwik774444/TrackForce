const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String },
});

module.exports = mongoose.model('Problem', problemSchema);
