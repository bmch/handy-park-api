const Location = require('../models/location');

//const moment = require('moment');
const moment = require('moment');
require('moment-precise-range-plugin');

exports.getAll = async (req, res) => {
  try {
    const result = await Location.find();
    const total = await Location.countDocuments();
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', total);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const start = new Date(req.query.start_time);
    const end = new Date(req.query.end_time);
    const diff = moment.preciseDiff(start, end, true);
    const result = await Location.find().lean();

    let modified = result.map(obj => {
      let quote = 0;
      let objb = {};

      if (diff.months) {
        quote = diff.months * obj.monthly_price;
      }
      if (diff.days) {
        quote += diff.days * obj.daily_price;
      }
      if (diff.hours) {
        quote += diff.hours * obj.price;
      }
      objb.quote = quote.toFixed(2);
      objb.start_date = start;
      objb.end_date = end;
      const merged = Object.assign(obj, objb);
      return merged;
    });

    res.status(201).json(modified);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const result = await Location.find();
    const total = await Location.countDocuments();
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', total);

    let admin = { data: result, total: total };
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.post = async (req, res) => {
  try {
    const result = await Location.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
