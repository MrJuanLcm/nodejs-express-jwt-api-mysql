const { NOT_FOUND } = require("http-status-codes");

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(NOT_FOUND);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.statusCode =
    err.response && err.response.status ? err.response.status : res.statusCode;

  if (res.statusCode >= 500) {
    console.error(err.message);
  } else {
    console.warn(err.message);
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  const errorMessage = {
    code: res.statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };

  res.json(errorMessage);
};

module.exports = { notFound, errorHandler };
