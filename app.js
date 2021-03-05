const express = require("express");
const db = require("./app/models");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const initRole = require('./app/controllers/role.controller');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(passport.initialize()); 
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    initRole();
});