const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user');
const passportJwt = require('passport-jwt');

// passport.serializeUser((user, cb) => {
//   cb(null, user.id);
// });

// passport.deserializeUser(async (id, cb) => {
//   const foundUser = await User.findById(id);
//   cb(null, foundUser);
// });

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    console.log('passport jwt strategy');
    const user = await User.findById(payload.sub);
    if (user) {
      return done(null, user, payload);
    }
    return done();
  })
);

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const { email, id, given_name, family_name } = profile;
      const currentUser = await User.findOne({
        $or: [{ email: email }, { googleId: id }],
      });
      if (currentUser) {
        cb(null, currentUser);
      } else {
        console.log('about to save new user');
        console.log(email, given_name);
        const newUser = await new User({
          email,
          firstName: given_name,
          lastName: family_name,
          googleId: id,
        }).save();
        cb(null, newUser);
      }
    }
  )
);
