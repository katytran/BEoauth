const express = require("express");
const router = express.Router();
const bookControllers = require("../controllers/books.controllers");
const { loginRequired } = require("../middlewares/authentication");
/**
 * @route POST books
 * @description create book
 * @access --unknown
 */
router.post("/", loginRequired, bookControllers.createBook);

/**
 * @route POST books/:id
 * @description create book
 * @access --unknown
 */
router.post("/:id", bookControllers.updateBook);

/**
 * @route GET book
 * @description get all books
 * @access --unknown
 */
router.get("/", bookControllers.getAllBook);

/**
 * @route GET book
 * @description get my books
 * @access --required login
 */
router.get("/own", loginRequired, bookControllers.getMyBooks);
module.exports = router;
