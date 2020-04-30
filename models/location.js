const mongoose = require('../db');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const locationSchema = new Schema({
  id: ObjectId,
  formatted_address: { type: String},
  price: {type: Number},
  daily_price: {type: Number},
  weekly_price: {type: Number},
  monthly_price: {type: Number},
  image: {type: String},
  location: {
      lat: {type:Number, required:true},
      lng: {type:Number, required:true},
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
