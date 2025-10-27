module.exports = function (req, res, next) {
  if (!req.user) return res.status(401).json({ msg: 'Unauthorized' });
  const User = require('../models/User');
  User.findById(req.user.id).then(user => {
    if (user && user.isAdmin) next();
    else res.status(403).json({ msg: 'Admin access required' });
  }).catch(err => res.status(500).json({ msg: err.message }));
};
