const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id);
	// user.id here is _id not googleID
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			// console.log('access token\n', accessToken);
			// console.log('refresh token\n', refreshToken);
			// console.log('profile\n', profile);
			User.findOne({ googleID: profile.id }).then((existingUser) => {
				if (existingUser) {
					// already exists, do nothing
					done(null, existingUser);
				} else {
					new User({ googleID: profile.id })
						.save()
						.then((user) => done(null, user));
				}
			});
		}
	)
);
