const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  googleId: String,
  // car_reg: { type: String },
});

userSchema.pre('validate', function (next) {
  if (!this.password && !this.googleId) {
    next(new Error('either password or social id required'));
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);
