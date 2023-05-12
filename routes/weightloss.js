const express = require("express");
const {
  handleAddWeightloss,
  handleGetAllWeightloss,
  handleGetOneWeightloss,
  handleUpdateWeightloss,
  handleDeleteWeightloss,
} = require("../controllers/weightlossController");

const router = express.Router();

router
  .route("/")
  .post(handleAddWeightloss)
  .get(handleGetAllWeightloss);
router
  .route("/:id")
  .get(handleGetOneWeightloss)
  .put(handleUpdateWeightloss)
  .delete(handleDeleteWeightloss);

module.exports = router;
