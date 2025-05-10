const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('./keys');

// Options de configuration pour la stratégie JWT
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Rechercher l'utilisateur dans la base de données
        const user = await User.findById(jwt_payload.id);
        
        if (user) {
          // Si l'utilisateur est trouvé, retourner l'utilisateur
          return done(null, user);
        }
        // Si l'utilisateur n'est pas trouvé, retourner false
        return done(null, false);
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    })
  );
};