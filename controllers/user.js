const User = require('../models/user');

exports.account = async (req, res) => {
  try {
    console.log('inside account controller', req.currentUser);
    res.status(201).json(req.user);
  } catch (err) {
    res.status(500).json(err);
  }
};
