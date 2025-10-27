const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  solved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],// user's solved problems
  isAdmin: { type: Boolean, default: false } // new field 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
