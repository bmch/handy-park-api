const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/user');
const isAuth = require('../middlewear/authentication');

//router.get('/account', isAuth, userController.account);

router.get(
  '/account',
  passport.authenticate('jwt', { session: false }),
  userController.account
);

module.exports = router;
