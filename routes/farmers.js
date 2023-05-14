const express = require("express");
const {
  handleAddFarmers,
  handleGetAllFarmers,
  handleGetOneFarmers,
  handleUpdateFarmers,
  handleDeleteFarmers,
} = require("../controllers/farmersController");

const router = express.Router();

router.route("/").post(handleAddFarmers).get(handleGetAllFarmers);
router
  .route("/:id")
  .get(handleGetOneFarmers)
  .put(handleUpdateFarmers)
  .delete(handleDeleteFarmers);

module.exports = router;
