var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    polls: [      
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Poll"
          }
      ]
});

//Passportlocalmongoose adds methos to the user schema.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
