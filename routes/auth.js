const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const passport = require('passport');

const User = require('../models/user');
const authController = require('../controllers/auth');
const socialAuthController = require('../controllers/socialAuth');

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    check('password').trim().isLength({ min: 5 }),
    check('firstName').trim().not().isEmpty(),
    check('lastName').trim().not().isEmpty(),
  ],
  authController.signup
);

router.post('/login', authController.login);

router.get('/login/success', socialAuthController.loginSuccess);

router.get('/login/failed', socialAuthController.loginFailure);

router.get('/logout', socialAuthController.logout);

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', { session: false }),
  // (req, res) => {
  //   res.redirect('http://localhost:8080/loginSuccess');
  // }
  authController.googleSuccess
);

// router.get(
//   '/google/redirect',
//   passport.authenticate('google', {
//     successRedirect: 'http://localhost:8080/loginSuccess',
//     failureRedirect: '/auth/login/failed',
//   })
// );

module.exports = router;
