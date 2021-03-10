const db = require("../models");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../../config/auth.config");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, authConfig.JWT.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// passport.use(new GoogleStrategy({
//     clientID: authConfig.google.clientID,
//     clientSecret: authConfig.google.clientSecret,
//     callbackURL: authConfig.google.callbackURL
//   },
//   function(accessToken, refreshToken, profile, done) {
//       console.log(accessToken, refreshToken, profile)
//       console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
//       return done(null, profile)
//   }
// ))

// passport.use(new SteamStrategy({
//     returnURL: authConfig.steam.returnURL,
//     realm: authConfig.steam.realm,
//     apiKey: authConfig.steam.apiKey
//   },
//   function(identifier, profile, done) {
//     User.findByOpenID({ openId: identifier }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// // These functions are required for getting data To/from JSON returned from Providers
// passport.serializeUser(function(user, done) {
//     console.log('I should have jack ')
//     done(null, user)
// })
// passport.deserializeUser(function(obj, done) {
//     console.log('I wont have jack shit')
//     done(null, obj)
// })