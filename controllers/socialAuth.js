const User = require('../models/user');

exports.loginSuccess = (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  }
};

exports.loginFailure = (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('http://localhost:8080');
};
