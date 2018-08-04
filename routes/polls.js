var express = require("express");

var router = express.Router();

var User = require("../models/user");
var Poll = require("../models/poll");

/* GET home page. */

router.get("/", isLoggedIn, function(req, res, next){
  Poll.find({}, function(err, polls){
    if (err) {
      res.send("404!") 
    } else {   
      res.render("polls/index", {polls: polls})
    }
  })
})

router.get("/mypolls", isLoggedIn, function(req, res){
  console.log(req.user.polls);
  
  res.send(req.user.polls)
})

router.post('/:pollId/vote', isLoggedIn, (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId, function(err, user){
    _allPolls = user.polls;
    _allPolls.push(req.params.pollId)
    user.update({polls: _allPolls}, function(err){
      console.log(user.polls);

      const choiceId = req.body.choiceId;  
      const choice = req.body.choice;
      Poll.findById(
        req.params.pollId,
        function (err, _poll) {
            console.log(_poll);
            
            /** Temporarily store choices in a new variable because we cannot directly modify the document */
            let _updateChoiceOptions = _poll.choices;
            // console.log(_updateChoiceOptions);
            
            /** We need to iterate over the choices array  */
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
    })
  })
  
});


router.get("/new", isLoggedIn, function(req, res, next){
  res.render("polls/new")
})

router.post("/new", isLoggedIn, function(req, res, next){
  let topicChosen = req.body.topic,
  choice1 = req.body.choice1,
  choice2 = req.body.choice2,
  choice3 = req.body.choice3

  Poll.create({
  topic:topicChosen,
  choices: [
    {value:choice1, votes: 0},
    {value:choice2, votes: 0},
    {value:choice3, votes: 0}
  ]
  }, function(err, pollCreated){
    console.log(pollCreated);
    res.redirect("/polls")
  })
})

function isLoggedIn(req, res, next){
  if (req.user) {
    return next();
  } else {
    res.redirect("/login");
  }
}


module.exports = router;