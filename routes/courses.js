const express = require("express");
const {
  handleAddCourse,
  handleDeleteCourse,
  handleGetAllCourses,
  handleGetSingleCourse,
  handleUpdateCourse,
} = require("../controllers/coursesController");

const router = express.Router();

router.route("/").post(handleAddCourse).get(handleGetAllCourses);
router
  .route("/:id")
  .get(handleGetSingleCourse)
  .delete(handleDeleteCourse)
  .put(handleUpdateCourse);

module.exports = router;
