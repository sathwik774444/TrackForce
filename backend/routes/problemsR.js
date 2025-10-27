// const express = require('express');
// const router = express.Router();
// const { addProblem, getProblemsByTopic } = require('../controllers/problemController');
// const auth = require('../middleware/authMiddleware');

// router.post('/', auth, addProblem);
// router.get('/:topic', auth, getProblemsByTopic);

// module.exports = router;



const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Use admin middleware for creating problems
router.post('/', auth, admin, async (req, res) => {
  const { title, codeforcesId, url, difficulty, tags, topic } = req.body;
  const p = new Problem({ title, codeforcesId, url, difficulty, tags, topic });
  await p.save();
  res.json(p);
});


// list problems by topic
router.get('/topic/:topicId', async (req, res) => {
  const problems = await Problem.find({ topic: req.params.topicId }).sort({ createdAt: -1 });
  res.json(problems);
});

// backend/routes/problems.js
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().populate("topic", "name"); // populate topic name
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// mark/unmark solved by user
router.post('/toggle-solve/:problemId', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const pid = req.params.problemId;
  const idx = user.solved.findIndex(x => x.toString() === pid);
  if (idx === -1) user.solved.push(pid);
  else user.solved.splice(idx, 1);
  await user.save();
  res.json({ solved: user.solved });
});

module.exports = router;
