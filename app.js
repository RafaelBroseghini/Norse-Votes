require('dotenv').config();
var createError     = require('http-errors');
var express         = require('express');
var app             = express();
var mongoose        = require("mongoose");
var passport        = require("passport");
var flash           = require('connect-flash');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var pollRoutes  = require('./routes/polls')
var usersRoutes = require('./routes/users')


mongoose.connect("mongodb://localhost:27017/norse-votes", { useNewUrlParser: true });
// require('./config/passport')(passport); // pass passport for configuration

// var pollRoutes  = require('./routes/polls')(app, passport);
// var usersRoutes = require('./routes/users')(app, passport);

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
app.use(flash()); 

require('./config/passport')(passport); // pass passport for configuration


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
