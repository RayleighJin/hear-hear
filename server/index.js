const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");

require("./models/User");
require("./services/passport");

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

mongoose.connect(keys.mongoURI);

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
