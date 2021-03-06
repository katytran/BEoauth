const express = require("express");
const { resource } = require("../app");
const router = express.Router();
const UserController = require("../controllers/users.controllers");
const { loginRequired } = require("../middlewares/authentication");
/**
 * @route POST Users
 * @description Create User
 * @access --unknown
 */
router.post("/", UserController.createUser);

/**
 * @route PUT Users/me
 * @description Update user profile
 * @access --login required
 */
router.put("/me", loginRequired, UserController.updateProfile);

/**
 * @route GET Users/me
 * @description Get current user
 * @access --login required
 */
router.get("/me", loginRequired, UserController.getCurrentUser);

module.exports = router;
