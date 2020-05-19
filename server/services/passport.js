/*
handling authentication mainly
*/
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

// to check if the user is an authenticated one, is to compare what the user submitted with session
// to fetch or save obj in session, need to do serialize & deserialize
passport.serializeUser((user, done) => {
	done(null, user.id);
	// user.id here is _id not googleID
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
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
