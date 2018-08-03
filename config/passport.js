var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;
var localStrategy   = require("passport-local").Strategy;

var User            = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
      // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new localStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
    
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
    
            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
    
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
    
            // all is well, return successful user
            return done(null, user);
        });
    
    }));
    
    passport.use('local-signup', new localStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
    
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
    
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ $or: [{'local.email' :  email} , {'google.email': email}]}, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);
    
            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
    
                // if there is no user with that email
                // create the user
                var newUser            = new User();
    
                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
    
                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });    
        });
    }));
    
    passport.use(new GoogleStrategy({
        clientID: "937615608234-s4rj9djlli0a6hgf2ojilclgl9j37l1b.apps.googleusercontent.com",
        clientSecret: "8rAxnvxcHN1yguJMSmZ2Ijfz",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        
        process.nextTick(function() {
        User.findOne({ "google.id": profile.id }, function (err, user) {
            if (err) {
            return done(err);
            }
            if (user){
            return done(err, user);
            } else {
            console.log("not found");
            
            // if the user isnt in our database, create a new user
            var newUser          = new User();
    
            // set all of the relevant information
            newUser.google.id    = profile.id;
            newUser.google.token = accessToken;
            newUser.google.name  = profile.displayName;
            newUser.google.email = profile.emails[0].value; // pull the first email
    
            // save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
            }
        })
        })
        }
    ))
};