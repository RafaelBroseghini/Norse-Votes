let mongoose = require("mongoose");

let pollSchema = new mongoose.Schema({
  topic: String,
  choices:[
    {
    value: String,
    vote: Number
    }
  ]
})

module.exports = mongoose.model("Poll", pollSchema);