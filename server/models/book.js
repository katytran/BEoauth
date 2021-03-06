const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },

  description: {
    type: String,
    require: true,
    trim: true,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    require: true,
  },

  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],

  owner: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "User",
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
