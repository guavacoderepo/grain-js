const Recommendations = require("../models/Recommendations");
const ErrorResponse = require("../utils/errorResponse");

// @Desc      Add new health tips
// @Route     Post api/v1/Recommendations/
// @Access    Private
exports.handleAddRecommendations = async (req, res, next) => {
  try {
    const data = await Recommendations.create(req.body);

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get all health tips
// @Route     GET api/v1/Recommendations/
// @Access    Private
exports.handleGetAllRecommendations = async (req, res, next) => {
  try {
    const data = await Recommendations.find(req.query);

    res.status(200).json({ status: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get Single health tips
// @Route     GET api/v1/Recommendations/:id
// @Access    Private
exports.handleGetOneRecommendations = async (req, res, next) => {
  try {
    const data = await Recommendations.findById(req.params.id);

    // check is id is valid
    if (!data) {
      return next(new ErrorResponse("invalid id", 404));
    }

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Put Single health tips
// @Route     PUT api/v1/Recommendations/:id
// @Access    Private
exports.handleUpdateRecommendations = async (req, res, next) => {
  try {
    const data = await Recommendations.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // check is id is valid
    if (!data) {
      return next(new ErrorResponse("invalid id", 404));
    }

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Delete Single health tips
// @Route     DELETE api/v1/Recommendations/:id
// @Access    Private
exports.handleDeleteRecommendations = async (req, res, next) => {
  try {
    const data = await Recommendations.findByIdAndDelete(req.params.id);

    // check is id is valid
    if (!data) {
      return next(new ErrorResponse("invalid id", 404));
    }

    res.status(200).json({ status: true });
  } catch (err) {
    next(err);
  }
};
