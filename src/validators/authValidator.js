const Joi = require("joi");
const { BAD_REQUEST, OK } = require("http-status-codes");

const signIn = (req, res, next) => {
  const payload = {
    username: req.body.username,
    password: req.body.password,
  };

  const validation = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  });

  const { error } = validation.validate(payload);

  if (error) {
    return res.status(BAD_REQUEST).json({
      message: error.message,
    });
  }

  next();
};

const signUp = (req, res, next) => {
  const payload = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  const validation = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
  });

  const { error } = validation.validate(payload);

  if (error) {
    return res.status(BAD_REQUEST).json({
      message: error.message,
    });
  }

  next();
};

module.exports = {
  signIn,
  signUp,
};
