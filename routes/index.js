var express = require("express");

var router = express.Router();

var Poll = require("../models/poll");

/* GET home page. */

router.get("/", function(req, res, next){
//   Poll.find({}, function(err, polls){
//     if (err) {
//       res.send("404!")
      
//     } else {
//       res.render("index", {polls: polls})
//      }
//    })
  res.render("index")
})

module.exports = router;