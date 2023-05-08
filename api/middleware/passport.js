import passport from 'passport';
import User from '../models/user.model.js';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//google login
const GOOGLE_CLIENT_ID = "731369365470-1h9c9er5liqp22qtq496fgkvp01av8om.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
passport.use(
    new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8800/api/auth/google/callback",
    scope:['profile','email']
    
  },
  async function (accessToken, refreshToken, profile, done)  {
  
    const user = await User.findOne({ email: profile._json.email });
    if (user) {
      const token = jwt.sign({
        id: user._id,
        role:user.role
    },
    process.env.JWT_KEY)
    const {password ,role, ...info} = user._doc
    const userinfo = {
        token:token,
        user:info
    }
      return done(null, userinfo);
    
    }
    const hash = bcrypt.hashSync(profile._json.sub , 5)
      const newUser = new User({
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        password:hash ,
      });
      await newUser.save();
      const token = jwt.sign({
        id: newUser._id,
        role:newUser.role
    },
    process.env.JWT_KEY)
    const {password ,role, ...info} = newUser._doc
    const userinfo = {
        token:token,
        data:info
    }

    done(null, userinfo);
  }
  )
);
passport.serializeUser((userinfo,done)=>{
    done(null,userinfo);
   
});
passport.deserializeUser((userinfo,done)=>{
    done(null,userinfo);

});

// facebook login
const FACEBOOK_APP_ID = "116372268085667"
const FACEBOOK_APP_SECRET = "57be6cf4d1b47de64f33d244e3de3ec4"
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8800/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
  async function (accessToken, refreshToken, profile, done)  {

  
    console.log(profile)
    const user = await User.findOne({ email: profile._json.email });
    if (user) {
      const token = jwt.sign({
        id: user._id,
        role:user.role
    },
    process.env.JWT_KEY)
    const {password ,role, ...info} = user._doc
    const userinfo = {
        token:token,
        user:info
    }
      return done(null, userinfo);
    
    }
    const hash = bcrypt.hashSync(profile._json.sub , 5)
      const newUser = new User({
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        password:hash ,
      });
      await newUser.save();
      const token = jwt.sign({
        id: newUser._id,
        role:newUser.role
    },
    process.env.JWT_KEY)
    const {password ,role, ...info} = newUser._doc
    const userinfo = {
        token:token,
        data:info
    }

    done(null, userinfo);
  }
  )
);
passport.serializeUser((userinfo,done)=>{
    done(null,userinfo);
   
});
passport.deserializeUser((userinfo,done)=>{
    done(null,userinfo);

});





export default passport;