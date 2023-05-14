const Farmers = require("../models/farmer");
const ErrorResponse = require("../utils/errorResponse");

// @Desc      Add new health tips
// @Route     Post api/v1/Farmers/
// @Access    Private
exports.handleAddFarmers = async (req, res, next) => {
  try {
    const data = await Farmers.create(req.body);

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get all health tips
// @Route     GET api/v1/Farmers/
// @Access    Private
exports.handleGetAllFarmers = async (req, res, next) => {
  try {
    const data = await Farmers.find(req.query);

    res.status(200).json({ status: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get Single health tips
// @Route     GET api/v1/Farmers/:id
// @Access    Private
exports.handleGetOneFarmers = async (req, res, next) => {
  try {
    const data = await Farmers.findById(req.params.id);

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
// @Route     PUT api/v1/Farmers/:id
// @Access    Private
exports.handleUpdateFarmers = async (req, res, next) => {
  try {
    const data = await Farmers.findByIdAndUpdate(req.params.id, req.body, {
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
// @Route     DELETE api/v1/Farmers/:id
// @Access    Private
exports.handleDeleteFarmers = async (req, res, next) => {
  try {
    const data = await Farmers.findByIdAndDelete(req.params.id);

    // check is id is valid
    if (!data) {
      return next(new ErrorResponse("invalid id", 404));
    }

    res.status(200).json({ status: true });
  } catch (err) {
    next(err);
  }
};
