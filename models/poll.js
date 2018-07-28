let mongoose = require("mongoose");

let pollSchema = new mongoose.Schema({
  topic: String,
  choices:[
    {
    value: String,
    votes: Number
    }
  ]
})

module.exports = mongoose.model("Poll", pollSchema);