const express = require('express');
const router = express.Router();
const { addProblem, getProblemsByTopic } = require('../controllers/problemController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addProblem);
router.get('/:topic', auth, getProblemsByTopic);

module.exports = router;
