const Genre = require("../models/genres");

const createGenre = async (req, res) => {
  try {
    const genre = new Genre({
      name: req.body.name,
    });

    await genre.save();

    res.status(201).json({
      success: true,

      data: genre,

      message: `Genre ${genre.name} created!`,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

const getGenre = async (req, res) => {
  try {
    const genre = await Genre.find({});
    res.status(201).json({
      success: true,

      data: genre,

      message: `Genre ${genre.length} found!`,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

module.exports = {
  createGenre,
  getGenre,
};
