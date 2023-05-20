const express = require("express");
const {
  handleAddNotification,
  handleGetAllNotification,
} = require("../controllers/notificationController");

const router = express.Router();

router.route("/").post(handleAddNotification).get(handleGetAllNotification);


module.exports = router;
