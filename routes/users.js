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
  res.render("register")
})

//create user
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      console.log(err)
      return res.render("register")
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/polls")
      })
    }
  });
})

//Show login form
router.get("/login", function(req, res){
  res.render("login")
})

//Login
router.post("/login", passport.authenticate("local", 
                   {
                     successRedirect:"/polls", 
                     failureRedirect: "/login"
                   }), function(req, res){
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
