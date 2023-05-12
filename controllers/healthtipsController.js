const HealthTips = require("../models/HealthTips");
const ErrorResponse = require("../utils/errorResponse");

// @Desc      Add new health tips
// @Route     Post api/v1/healthtips/
// @Access    Private
exports.handleAddHealthTips = async (req, res, next) => {
  try {
    const data = await HealthTips.create(req.body);

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get all health tips
// @Route     GET api/v1/healthtips/
// @Access    Private
exports.handleGetAllHealthTips = async (req, res, next) => {
  try {
    const data = await HealthTips.find(req.query);

    res.status(200).json({ status: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get Single health tips
// @Route     GET api/v1/healthtips/:id
// @Access    Private
exports.handleGetOneHealthTips = async (req, res, next) => {
  try {
    const data = await HealthTips.findById(req.params.id);
 
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
// @Route     PUT api/v1/healthtips/:id
// @Access    Private
exports.handleUpdateHealthTips = async (req, res, next) => {
  try {
    const data = await HealthTips.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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
// @Route     DELETE api/v1/healthtips/:id
// @Access    Private
exports.handleDeleteHealthTips = async (req, res, next) => {


  try {
    const data = await HealthTips.findByIdAndDelete(req.params.id);

    // check is id is valid
    if (!data) {
      return next(new ErrorResponse("invalid id", 404));
    }

    res.status(200).json({ status: true, data: data });
  } catch (err) {
    next(err);
  }
};
