const Author = require("../models/author");
const createAuthor = async (req, res) => {
  try {
    const author = new Author({ name: req.body.name });
    await author.save();
    res.status(201).json({
      success: true,
      data: author,
      message: `Author ${author.name} created`,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

const findAllAuthor = async (req, res) => {
  try {
    const author = await Author.find({});
    res.status(201).json({
      success: true,
      data: author,
      message: `All authors`,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

const findAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.status(201).json({
      success: true,
      data: author,
      message: `Author ${author.id} found`,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

const updateAuthor = async (req, res) => {
  try {
    console.log("params", req.params.id);
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    res.status(200).json({
      status: true,
      data: author,
      message: `Author ${author.id} was updated`,
    });
  } catch (e) {
    res.status(400).json({
      satus: false,
      message: e.message,
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: true,
      data: author,
      message: `Author ${author.id} was delete`,
    });
  } catch (e) {
    res.status(400).json({
      satus: false,
      message: e.message,
    });
  }
};

module.exports = {
  createAuthor,
  findAuthor,
  updateAuthor,
  deleteAuthor,
  findAllAuthor,
};
