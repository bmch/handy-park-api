const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const parkingRoutes = require('./routes/parking');
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/user');
app.use(cors());

app.use(passport.initialize());

// const whitelist = [
//   process.env.CLIENT_URL,
//   'http://localhost:8080',
//   'https://parking.bmch.works',
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// };

//app.use(cors(corsOptions));

app.use(express.json());

app.use('/health', function (req, res) {
  res.sendStatus(200);
});
app.use('/parking', parkingRoutes);
app.use('/auth', authRoutes);
app.use('/user', privateRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(` ✅ 🚀 Server is listening on port ${PORT}`); // eslint-disable-line no-console
});
