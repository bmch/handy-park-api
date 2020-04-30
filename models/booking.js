const mongoose = require('../db');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bookingSchema = new Schema({
  id: ObjectId,
  // location_id: { type: String},
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  price: { type: Number },
  start_time: { type: Date },
  end_time: { type: Date },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  car_reg: { type: String }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
