const express = require("express");
const {
  handleAddRecommendations,
  handleGetAllRecommendations,
  handleGetOneRecommendations,
  handleUpdateRecommendations,
  handleDeleteRecommendations,
} = require("../controllers/recommendationsController");

const router = express.Router();

router.route("/").post(handleAddRecommendations).get(handleGetAllRecommendations);
router
  .route("/:id")
  .get(handleGetOneRecommendations)
  .put(handleUpdateRecommendations)
  .delete(handleDeleteRecommendations);

module.exports = router;
