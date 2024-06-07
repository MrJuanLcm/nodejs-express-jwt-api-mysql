const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("http-status-codes");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.APP_KEY);

      next();
    } catch (error) {
      res.status(UNAUTHORIZED);
      throw new Error("No autorizado, token fallido");
    }
  }

  if (!token) {
    res.status(UNAUTHORIZED);
    throw new Error("No autorizado, token fallido");
  }
});

module.exports = { protect };
