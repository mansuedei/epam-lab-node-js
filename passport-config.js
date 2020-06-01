const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

  const verifyJWT = token => {
    let isValid = false;
    if (token) {
      jwt.verify(token, 'verybigsecret', (error, decoded) => {
        if (error) {
          isValid = false;
        } else {
          isValid = true;
        }
      });
    } else {
      isValid = false;
    }
    return isValid;
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', password: 'password' },
      authenticateUser
    )
  );

  passport.use(
    new BearerStrategy((token, done) => {
      const isValid = verifyJWT(token);

      try {
        if (isValid) {
          return done(null, token);
        }
      } catch {
        return done(null, false, { message: 'Incorrect username or password' });
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;
