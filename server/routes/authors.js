const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authors.controllers");
/**
 * @route POST authors
 * @description Create author
 * @access --unknown
 */
router.post("/", authorController.createAuthor);

/**
 * @route GET authors/:id
 * @description Find author by ID
 * @access --unknown
 */
router.get("/:id", authorController.findAuthor);

/**
 * @route PUT authors/:id
 * @description  Update author by ID
 * @access --unknown
 */
router.put("/:id", authorController.updateAuthor);

/**
 * @route DELETE authors/:id
 * @description Delete author by ID
 * @access --unknown
 */
router.delete("/:id", authorController.deleteAuthor);

/**
 * @route GET authors/
 * @description Get all authors
 * @access --unknown
 */
router.get("/", authorController.findAllAuthor);

module.exports = router;
