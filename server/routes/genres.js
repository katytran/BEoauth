const express = require("express");
const router = express.Router();
const genreControllers = require("../controllers/genres.controllers");

/**
 * @route POST genre
 * @description create genre
 * @access --unknown
 */
router.post("/", genreControllers.createGenre);

/**
 * @route GET genre
 * @description create genre
 * @access --unknown
 */
router.get("/", genreControllers.getGenre);

module.exports = router;
