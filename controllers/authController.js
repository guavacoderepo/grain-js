const Users = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { use } = require("../routes/users");

// @Desc      Register a new user
// @Route     Post api/v1/auth/register
// @Access    Public
exports.handleRegister = async (req, res, next) => {
  try {
    const user = await Users.create(req.body);

    // send token reponse with cookie
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @Desc      Login as a user
// @Route     Post api/v1/auth/login
// @Access    Public
exports.handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // validate user email and password
    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }

    // check if user exit in db
    const user = await Users.findOne({ email }).select("+password");

    // check if user exit in db
    if (!user) {
      return next(new ErrorResponse("Invalid User", 400));
    }

    // console.log(user);
    // check if valid password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid User", 400));
    }

    // send token reponse with cookie
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @Desc      Get single user
// @Route     Put api/v1/user/me
// @Access    Private
exports.handleFetchme = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);

    // check if id exit
    if (!user) {
      return next(new ErrorResponse("Invalid user Id", 404));
    }

    // send token reponse with cookie
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @Desc      Forgot password
// @Route     PUT api/v1/auth/forgotPassword
// @Access    Public
exports.handleForgotPassword = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    // check if email is valide
    if (!user) {
      return next(new ErrorResponse("invalid user email", 404));
    }

    // get reset token

    const resetToken = await user.resetTokenModel();

    await user.save({ validateBeforeSave: false });

    // create a reset url
    const restUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `This is your reset url \n\n${restUrl}`;

    // send token to user email
    console.log(message);
    console.log(resetToken);
    await sendEmail({
      email: req.body.email,
      subject: "Reset password token",
      message,
    });

    // send token reponse with cookie
    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};

// @Desc      Reset password
// @Route     PUT api/v1/auth/resetpasswordtoken/:passwordtoken
// @Access    Public
exports.handleResetPasswordToken = async (req, res, next) => {
  try {
    // Get reset password token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    // Check if token exit
    const user = await Users.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    //Check if user exit
    if (!user) {
      return next(new ErrorResponse("Invalid user token", 400));
    }

    user.resetPasswordExpire = null;
    user.resetPasswordToken = null;
    await user.save({ validateBeforeSave: false });

    // const user = await Users.findOne({ email: req.body.email });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @Desc      Update password
// @Route     PUT api/v1/auth/resetpassword
// @Access    Private
exports.handleResetPassword = async (req, res, next) => {
  try {
    // Get datas to change
    const { password } = req.body;

    // Check if user exit
    const user = await Users.findById(req.user.id).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invaid user id", 400));
    }

    // Update password
    user.password = password;
    await user.save();

    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};

// @Desc      Reset password
// @Route     PUT api/v1/auth/resetpassword/:id
// @Access    Private
exports.handleChangePassword = async (req, res, next) => {
  try {
    // Get datas to change
    const { newpassword, oldpassword } = req.body;

    // Check if user exit
    const user = await Users.findById(req.user.id).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invaid user id", 400));
    }

    // Check if password match
    if (!(await user.matchPassword(oldpassword))) {
      return next(new ErrorResponse("Invaid user password", 404));
    }

    // Update password
    user.password = newpassword;
    user.save();

    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};

// Get token cookie from model and send to the browser
const sendTokenResponse = (user, statusCode, res) => {
  // generate web token
  const token = user.getSignJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: true,
    data: user,
    token,
  });
};
