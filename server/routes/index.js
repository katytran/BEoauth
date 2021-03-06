const express = require("express");
const router = express.Router();
const authApi = require("./auth");
const authorsApi = require("./authors");
const booksApi = require("./books");
const usersApi = require("./users");
const genresApi = require("./genres");

router.use("/authors", authorsApi);
router.use("/books", booksApi);
router.use("/genres", genresApi);
router.use("/users", usersApi);
router.use("/auth", authApi);

module.exports = router;
