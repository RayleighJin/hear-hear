const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

// models should be required before routes
require("./models/User");
require("./models/Survey");
require("./services/passport");

const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

const app = express();

// 4 middlewares for preprocessing of the incoming requests
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 3600 * 1000, // Cookie TTL 30 days
		keys: [keys.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === "production") {
	// Express will serve up production assets
	app.use(express.static("client/build"));
	// Express will serve up the index.html file if the route is not recognized
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
