const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../../models/users');

passport.serializeUser(function(id, done) {
  console.log('serialize >>>', id),
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  console.log('DEserialize >>>', id);
  done(null, id);
});

passport.use(
  new LocalStrategy(
    async (name, passwd, done) => {
      let result = await Users.checkUser(name, passwd);
      if (result) {
        const currentUser = await Users.getUserByLogin(name);
        return done(null, currentUser._id);
      } else {
        return done(null, false);
      }
    }
  )
);