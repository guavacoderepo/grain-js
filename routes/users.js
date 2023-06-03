const express = require("express");
const protect = require("../middlewares/authmiddleware");

const {
  handleDeleteUser,
  handleFetchUser,
  handleFetchUsers,
  handleUpdateUser,
  addBookmark,
  getBookmark,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").get(handleFetchUsers);
router.route("/update/").put(protect, handleUpdateUser);
router.route("/:id").delete(handleDeleteUser).get(handleFetchUser);
router.route("/bookmark").put(addBookmark)
router.route("/bookmark/:id").get(getBookmark);

module.exports = router;
