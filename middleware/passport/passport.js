const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("../../config/index");
const User = require("../../models/user.model");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        if (!user) return done(null, false);
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
