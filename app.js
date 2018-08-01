require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var pollRoutes = require('./routes/polls');
var usersRoutes = require('./routes/users');
var passport    = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var localStrategy = require("passport-local");
var User = require("./models/user")

var app = express();

mongoose.connect("mongodb://localhost:27017/norse-votes", { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//PASSPORT CONFIGURATION.
app.use(require("express-session")({
  secret: "may the norse be with you",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
    // used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});
passport.use(new localStrategy(User.authenticate()));

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
        // newUser.google.email = profile.emails.value; // pull the first email

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
));

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})


//  Routing.
app.use('/', usersRoutes);
app.use('/polls', pollRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
