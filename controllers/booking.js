const Booking = require('../models/booking');

exports.post = async (req, res) => {
  try {
    const result = await Booking.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getBooking = async (req, res) => {
  try {
    const result = await Booking.find().populate('location_id');
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
