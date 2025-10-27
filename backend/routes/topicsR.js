
const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find({});
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  const t = new Topic({ title, description });
  await t.save();
  res.json(t);
});

router.delete('/:id', auth, async (req, res) => {
  await Topic.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
