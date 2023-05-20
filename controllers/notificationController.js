const notification = require("../models/notification");
const Users = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");

// @Desc      Add new health tips
// @Route     Post api/v1/Notification/
// @Access    Private
exports.handleAddNotification = async (req, res, next) => {
  try {
    // get category
    const category = req.body.category;

    // query param
    const query = {
      category,
    };

    // filter all by category and update
    users = (await Users.find(query)).forEach(function (user) {
      user.isNotification = true;
      user.save();
    });

    // post notification
    const data = await notification.create(req.body);

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get all health tips
// @Route     GET api/v1/Notification/
// @Access    Private
exports.handleGetAllNotification = async (req, res, next) => {
  try {
    const data = await notification.find(req.query);

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};
