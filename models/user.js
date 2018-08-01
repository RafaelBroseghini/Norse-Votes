var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    local: 
        {
            email: { type: String},
            password: { type: String},
        },
    google: 
        {
            id: { type: String}, 
            token: { type: String}, 
            name: { type: String},
        },
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
