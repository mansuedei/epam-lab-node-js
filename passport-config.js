const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('./models/users-model');

function initialize(passport, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await Users.findOne({ email });
    if (user == null) {
      return done(null, false, { message: 'No user with this email' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'The input password is incorrect' });
    } catch (error) {
      return done(error);
    }
  };
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', password: 'password' },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;
