const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const loginRequired = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString)
      return res.status(401).json({
        success: false,

        error: "Token not found",
      });

    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,

            error: "Token expired.",
          });
        } else {
          return res.status(401).json({
            success: false,

            error: "Token is invalid",
          });
        }
      }
      req.userId = payload.id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { loginRequired };
