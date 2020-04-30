const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 400;
      error.data = errors.array();
      res
        .status(400)
        .json({ message: errors.errors[0].msg, param: errors.errors[0].param });
      throw error;
    }
    const { email, password, firstName, lastName } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password: hashedPw,
      firstName,
      lastName,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign(
      {
        email: savedUser.email,
        sub: savedUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '10 hours' }
    );
    res.status(201).json({
      user: {
        id: savedUser._id.toString(),
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
      },
      jwt: token,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let loadedUser;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 401;
      res.status(401).json({ message: 'Could not find your account.' });
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Passwords do not match');
      res.status(422).json({
        message:
          'Wrong password. Try again or click Forgot password to reset it',
      });
      error.statusCode = 422;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        sub: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '10h' }
    );
    res.status(200).json({
      user: {
        id: loadedUser._id.toString(),
        firstName: loadedUser.firstName,
        lastName: loadedUser.lastName,
        email: loadedUser.email,
      },
      jwt: token,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.googleSuccess = (req, res) => {
  if (req.user) {
    const { email, _id } = req.user;
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 40, //expire in 5 seconds
        email,
        sub: _id.toString(),
      },
      process.env.JWT_SECRET
    );

    res.redirect('http://localhost:8080/loginSuccess?token=' + token);
  }
};
