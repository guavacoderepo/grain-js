const express = require("express");
const protect = require("../middlewares/authmiddleware");

const {
  handleDeleteUser,
  handleFetchUser,
  handleFetchUsers,
  handleUpdateUser,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").get(handleFetchUsers);
router.route("/update/").put(protect, handleUpdateUser);
router.route("/:id").delete(handleDeleteUser).get(handleFetchUser);

module.exports = router;
