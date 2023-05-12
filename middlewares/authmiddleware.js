const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const Users = require("../models/Users");


// route protection
module.exports = protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //  make sure token exit
  if (!token) {
    return next(new ErrorResponse("Not Authourized to access this route"), 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Users.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not Authourized to access this route"), 401);
  }
};
