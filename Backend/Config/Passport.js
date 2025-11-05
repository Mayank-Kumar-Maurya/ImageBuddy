const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../modules/user.js")
 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/ImageBuddy/api/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, cb)=>
    {
        console.log(profile);
        try {
            let user = await User.findOne({ googleId: profile.id });

            // let user;
            if(!user)//does not exist
            {
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    history:[],
                });
            }
            return cb(null, user);

        } catch (error) {
            return cb(error, null);
        }

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));


// facebook

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/ImageBuddy/api/auth/facebook/callback"
  },
  async(accessToken, refreshToken, profile, cb)=> {
    try {
        let user = await User.findOne({ facebookId: profile.id });

        if(!user)//does not exist
                {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        facebookId: profile.id,
                        history:[],
                    });
                }
                return cb(null, user);

    } catch (error) {
        return cb(error, null);   
    }

  }
));


// github

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/ImageBuddy/api/auth/github/callback"
  },
  async(accessToken, refreshToken, profile, cb)=> {
    try {
        
        let user = await User.find({ githubId: profile.id });

    if(!user)//does not exist
                {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        githubId: profile.id,
                        history:[],
                    });
                }
                return cb(null, user);

    } catch (error) {
        return cb(error, null);   
    }

  }
));