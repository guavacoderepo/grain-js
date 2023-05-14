const express = require("express");
const {
  handleAddFacilities,
  handleGetAllFacilities,
  handleGetOneFacilities,
  handleUpdateFacilities,
  handleDeleteFacilities,
} = require("../controllers/facilitiesController");

const router = express.Router();

router.route("/").post(handleAddFacilities).get(handleGetAllFacilities);
router
  .route("/:id")
  .get(handleGetOneFacilities)
  .put(handleUpdateFacilities)
  .delete(handleDeleteFacilities);

module.exports = router;
