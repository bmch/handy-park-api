const mongoose = require('../db');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bookingSchema = new Schema(
  {
    id: ObjectId,
    location_id: { type: Schema.Types.ObjectId, ref: 'Location' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number },
    start_time: { type: Date },
    end_time: { type: Date },
    // car_reg: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
