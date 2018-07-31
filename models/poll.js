let mongoose = require("mongoose");

let pollSchema = new mongoose.Schema({
  topic: String,
  choices:[
    {
    value: String,
    votes: Number
    }
  ],
  timestamp : { type : Date, default: Date.now }
})

module.exports = mongoose.model("Poll", pollSchema);