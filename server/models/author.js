const mongoose = require("mongoose");

//same like class
// const authorSchema = mongoose.Schema({
//   name: String,
// });

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

//define our model from the schema
//Note that the first Author is the name of the variable,
//string "Author" is the name of our Model.

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
