const Book = require("../models/book");

const createBook = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    // const book = new Book({
    //   // title: req.body.name,
    //   // description: req.body.description,
    //   // author: req.body.author
    //   title,
    //   description,
    //   author,
    // });

    const book = new Book({ title, description, author, owner: req.userId });

    await book.save();

    res.status(201).json({
      success: true,

      data: book,

      message: `Book ${book.title} created!`,
    });
  } catch (e) {
    res.status(400).json({
      success: false,

      error: e.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, description, author, genres } = req.body;
    const oldBook = await Book.findById(req.params.id);
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: title === undefined ? oldBook.title : title,
        description:
          description === undefined ? oldBook.description : description,
        author: author === undefined ? oldBook.author : author,
        genres: genres === undefined ? oldBook.genres : genres,
      },
      { new: true }
    )
      .populate("genres", "-_id -__v")
      .populate("author", "-_id -__v");

    res.status(200).json({
      status: true,
      data: book,
      message: `Book ${book.id} ${book.name} was updated`,
    });
  } catch (e) {
    res.status(400).json({
      satus: false,
      message: e.message,
    });
  }
};

const getAllBook = async (req, res) => {
  try {
    const book = await Book.find({})
      .populate("author", "-_id -__v")
      .populate("genres", "-_id -__v");
    res.status(201).json({
      success: true,

      data: book,

      message: `${book.length} book found`,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ owner: req.userId })
      .populate("author")
      .populate("genres", "-_id -__v");

    res.status(200).json({
      success: true,

      data: books,
      userID: req.userId,

      message: `${books.length} books found!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,

      error: err.message,
    });
  }
};

module.exports = {
  createBook,
  getAllBook,
  updateBook,
  getMyBooks,
};
