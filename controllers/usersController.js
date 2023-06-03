const Users = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");

// @Desc      Get all user
// @Route     Post api/v1/user/all
// @Access    Public
exports.handleFetchUsers = async (req, res, next) => {
  try {
    const user = await Users.find();

    // check if id exit
    if (!user) {
      next(new ErrorResponse("Invalid user Id", 404));
    }

    // send a response to the users
    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get single user
// @Route     Post api/v1/user/
// @Access    Public
exports.handleFetchUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);

    // check if id exit
    if (!user) {
      return next(new ErrorResponse("Invalid user Id", 404));
    }

    // send a response to the users
    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @Desc      Put single user
// @Route     Post api/v1/user/
// @Access    Public
exports.handleUpdateUser = async (req, res, next) => {
  const user = await Users.findByIdAndUpdate(req.user.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!user) {
    return next(new ErrorResponse("invalid user id"));
  }

  res.status(200).json({ status: true });
};

// @Desc      Put bookmark
// @Route     Post api/v1/bookmark/
// @Access    Public
exports.addBookmark = async (req, res, next) => {
  const { id, userId } = req.body;

  const user = await Users.findById(userId);

  if (!user) {
    return next(new ErrorResponse("invalid user id"));
  }

  if (user.bookmark.includes(id)) {
    const index = await user.bookmark.indexOf(id);

    await user.bookmark.splice(index, 1);

    user.save();

    return res.status(200).json({ status: true });
  }

  await user.bookmark.push(id);

  user.save();

  res.status(200).json({ status: true });
};

// @Desc      Put bookmark
// @Route     Post api/v1/bookmark/
// @Access    Public
exports.getBookmark = async (req, res, next) => {
  const { id } = req.params;

  var data = [];

  const user = await Users.findById(id);

  if (!user) {
    return next(new ErrorResponse("invalid user id"));
  }

  await user.bookmark.forEach(function (bookmark) {
    console.log(bookmark);
  });

  res.status(200).json({ status: true });
};

// @Desc      Delete single user
// @Route     Post api/v1/user/
// @Access    Public
exports.handleDeleteUser = (req, res, next) => {
  res.status(200).json({ msg: "delete user" });
};

// northenharm
