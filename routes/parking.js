const router = require('express').Router();
const location = require('../controllers/location.js');
const booking = require('../controllers/booking.js');
const passport = require('passport');

router.get('/location', location.getAll);
router.post('/location', location.post);

router.get('/quotes', location.getQuotes);

router.get('/admin', location.getAdmin);

router.get(
  '/booking',
  passport.authenticate('jwt', { session: false }),
  booking.getBooking
);

//router.post('/booking', booking.post);

router.post(
  '/booking',
  passport.authenticate('jwt', { session: false }),
  booking.post
);

module.exports = router;
