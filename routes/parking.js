const router = require('express').Router();
const location = require('../controllers/location.js');
const booking = require('../controllers/booking.js');

router.get('/location', location.getAll);
router.post('/location', location.post);

router.get('/quotes', location.getQuotes);

router.get('/admin', location.getAdmin);

router.get('/booking', booking.getBooking);

router.post('/booking', booking.post);

module.exports = router;
