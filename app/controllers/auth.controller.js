const authConfig = require("../../config/auth.config.js");

let opts = {
    secretOrKey: authConfig.JWT.JWT_SECRET,
    jwtFromRequest: function(req) {
        let token = null;
        if (req && req.cookies){
            token = req.cookies['jwt']
        }
        return token
    }
}

const findOrCreate = function(user){
    if(checkUser(user)){  
        return user
    }else{
         // else create a new user
    }
}
const checkUser = function(input){
    for (let i in DATA) {
        if(input.email==DATA[i].email && (input.password==DATA[i].password || DATA[i].provider==input.provider))
            return true // found
        else
            return null //console.log('no match')
      }
    return false // not found
}

// main authentication, our app will rely on it
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("JWT BASED AUTH GETTING CALLED") // called everytime a protected URL is being served
    if (CheckUser(jwt_payload.data)) {
        return done(null, jwt_payload.data)
    } else {
        // user account doesnt exists in the DATA
        return done(null, false)
    }
}))

passport.use(new GoogleStrategy({
    clientID: "1038574997890-0mpugpgh22cb956t160seko9cn4uo41c.apps.googleusercontent.com",
    clientSecret: "NROxRNWUxJZmkar_YNYa--Fu",
    callbackURL: "http://localhost:5000/googleRedirect"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
      return done(null, profile)
  }
))

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:5000/steamRedirect',
    realm: 'http://localhost:5000/',
    apiKey: 'A09C0259814870DD089354F95D2F4E09'
  },
  function(identifier, profile, done) {
    User.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  }
));

// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser(function(user, done) {
    console.log('I should have jack ')
    done(null, user)
})
passport.deserializeUser(function(obj, done) {
    console.log('I wont have jack shit')
    done(null, obj)
})