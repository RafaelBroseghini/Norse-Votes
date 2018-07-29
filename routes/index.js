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
  const choiceId = req.body.choiceId;
  console.log(choiceId);
  
  const choice = req.body.choice;
  const identifier = `choices.${choiceId}.votes`;  
  console.log(identifier)
  Poll.findByIdAndUpdate({_id: req.params.pollId}, {$inc: {[identifier]: 1}}, {}, (err, numberAffected) => {
    console.log(numberAffected)
    
    let Pusher = require('pusher');
    let pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER
    });

    let payload = { pollId: req.params.pollId, choice: choice };
    pusher.trigger('poll-events', 'vote', payload, req.body.socketId);

    res.send('');
  });
});

module.exports = router;