var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

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

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//Passportlocalmongoose adds methos to the user schema.
// userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
