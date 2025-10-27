// const express = require('express');
// const router = express.Router();
// const { signup, login } = require('../controllers/authController');

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;



const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User exists' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hash });
    await user.save();
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid creds' });
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(400).json({ msg: 'Invalid creds' });
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

const auth = require('../middleware/auth');

// current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('solved');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// GET /users/ranking
router.get('/ranking', async (req, res) => {
  try {
    // Get all users and populate solved problems (optional)
    const users = await User.find().populate('solved', 'title').lean();

    // Map users with solved count
    const rankedUsers = users.map(user => ({
      _id: user._id,
      name: user.name,
      solvedCount: user.solved.length
    }));

    // Sort descending by solvedCount
    rankedUsers.sort((a, b) => b.solvedCount - a.solvedCount);

    // Add rank number
    rankedUsers.forEach((user, index) => {
      user.rank = index + 1;
    });

    res.json(rankedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
