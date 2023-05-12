const express = require("express");
const {
  handleAddHealthTips,
  handleGetAllHealthTips,
  handleGetOneHealthTips,
  handleUpdateHealthTips,
  handleDeleteHealthTips,
} = require("../controllers/healthtipsController");

const router = express.Router();

router.route("/").post(handleAddHealthTips).get(handleGetAllHealthTips);
router
  .route("/:id")
  .get(handleGetOneHealthTips)
  .put(handleUpdateHealthTips)
  .delete(handleDeleteHealthTips);

module.exports = router;
