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
  const identifier = `choices[0].votes`;  
  // console.log(identifier)



  Poll.findById(
    req.params.pollId,
    function (err, _poll) {
        console.log(_poll);
        
        /** Temporarily store labelOptions in a new variable because we cannot directly modify the document */
        let _updateChoiceOptions = _poll.choices;
        // console.log(_updateChoiceOptions);
        
        /** We need to iterate over the labelOptions array to check where Bob is */
        _updateChoiceOptions.forEach(function (_label) {

          if (_label._id == choiceId) {            
            ++_label.votes;
          } 

        });

        /** Update the documents labelOptions property with the temporary one we've created */
        _poll.update({choices: _updateChoiceOptions}, function (err) {
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
});

module.exports = router;