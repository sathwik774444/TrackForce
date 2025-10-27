
const mongoose = require('mongoose');
const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  codeforcesId: String,
  url: String,
  difficulty: String,
  tags: [String],
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);
