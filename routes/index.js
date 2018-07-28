var express = require("express");

var router = express.Router();

var Poll = require("../models/poll");

/* GET home page. */

router.get("/", function(req, res, next){
  
  Poll.find({}, function(err, polls){
    
    if (err) {
      res.send("404!")
      
    } else {   
      res.render("index.ejs", {polls: polls})
    }
  })
  // res.render("index")
})

router.post('/:pollId/vote', (req, res, next) => {
  const choice = req.body.choice;
  const identifier = `choices.${choice}.votes`;
  console.log(identifier);
  
  Poll.findByIdAndUpdate({_id: req.params.pollId}, {$inc: {[identifier]: 1}}, {}, (err, numberAffected) => {
      res.send('');
  });
});

module.exports = router;