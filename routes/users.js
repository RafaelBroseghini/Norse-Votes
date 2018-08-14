var express = require("express"),
    router = express.Router();

var passport = require("passport");
var User = require("../models/user");


//root route
router.get("/", function(req, res){
  res.render("landing", {currentUser:req.user})
})

//register route
router.get("/register", function(req, res){
  res.render("register", { message: req.flash('signupMessage') })
})

router.post("/register", passport.authenticate("local-signup", {
  successRedirect: "/polls",
  failureRedirect: "/register",
  failureFlash : true
}));

//Show login form
router.get("/login", function(req, res){
  res.render("login", {message: req.flash('loginMessage')})
})

//Login locally
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/polls', // redirect to the secure profile section
  failureRedirect : '/login',
  failureFlash : true // redirect back to the signup page if there is an error
  })
);

// Google OAuth 2.0 
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/polls');
});


// logout route
router.get("/logout", function(req,res){
  req.logout();
  res.redirect("/");
})

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
