const errorResponse = require("../utils/errorResponse");

module.exports = errorHandler = (err, req, res, next) => {
  let error = err;
  error.message = err.message;

  // console.log(err);

  // mongo bad Object error
  if (error.name === "CastError") {
    const message = `invalid id`;
    error = new errorResponse(message, 404);
  }

  // Mongo duplicate error
  if (error.code === 11000) {
    const message = `already exist`;
    error = new errorResponse(message, 404);
  }

  // Mongo validation error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message);
    error = new errorResponse(message, 404);
  }

  //  send response to user
  res.status(error.statusCode || 500).json({
    status: false,
    msg: error.message || "server error",
  });
};
