const Courses = require("../models/Courses");
const ErrorResponse = require("../utils/errorResponse");

// @Desc      Add new course
// @Route     Post api/v1/course/
// @Access    Private
exports.handleAddCourse = async (req, res, next) => {
  try {
    const data = await Courses.create(req.body);

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get all course
// @Route     Post api/v1/course/
// @Access    Private
exports.handleGetAllCourses = async (req, res, next) => {
  try {
    const data = await Courses.find(req.query);

    res.status(200).json({ status: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
}; 

// @Desc      Get a single course
// @Route     Post api/v1/course/:id
// @Access    Private
exports.handleGetSingleCourse = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);

    if (!course) {
      return next(new ErrorResponse("Invalid course id", 404));
    }

    res.status(200).json({ status: true, data: course });
  } catch (err) {
    next(err);
  }
};

// @Desc      Update a single course
// @Route     Post api/v1/course/:id
// @Access    Private
exports.handleUpdateCourse = async (req, res, next) => {
  try {
    const course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!course) {
      return next(new ErrorResponse("Invalid course id", 404));
    }

    res.status(200).json({ status: true, data: course });
  } catch (err) {
    next(err);
  }
};

// @Desc      Delete new course
// @Route     Post api/v1/course/:id
// @Access    Private
exports.handleDeleteCourse = async (req, res, next) => {
  try {
    const course = await Courses.findByIdAndDelete(req.params.id);

    if (!course) {
      return next(new ErrorResponse("Invalid course id", 404));
    }

    res.status(200).json({ status: true, data: {} });
  } catch (err) {
    next(err);
  }
};
