const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");
const { route } = require("./authors");
const passport = require("passport");
const { Router } = require("express");

/**
 * @route POST auth/login
 * @description login
 * @access public
 */
router.post("/login", authController.loginWithEmail);

router.post(
  "/login/google",
  passport.authenticate("google-token", { session: false }),
  authController.loginWithOAuth
);

router.post(
  "/login/facebook",
  passport.authenticate("facebook-token", { session: false }),
  authController.loginWithOAuth
);

router.post(
  "/login/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  authController.loginWithOAuth
);

module.exports = router;
