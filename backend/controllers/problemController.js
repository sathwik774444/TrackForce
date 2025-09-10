const Problem = require('../models/Problem');

exports.addProblem = async (req, res) => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProblemsByTopic = async (req, res) => {
  const { topic } = req.params;
  try {
    const problems = await Problem.find({ topic });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
