const Booking = require('../models/booking');
const User = require('../models/user');

exports.getBooking = async (req, res) => {
  try {
    const result = await Booking.find({ user_id: req.user._id }).populate(
      'location_id'
    );
    console.log('the result of the db query', result);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// exports.getBookingPrevious = async (req, res) => {
//   try {
//     const result = await Booking.find().populate('location_id');
//     res.status(201).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

exports.post = async (req, res) => {
  try {
    console.log('req user', req.user);
    console.log('req body', req.body);
    const { location_id, price, start_time, end_time } = req.body;

    const user_id = req.user._id;
    const result = await Booking.create({
      location_id,
      price,
      start_time,
      end_time,
      user_id,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
