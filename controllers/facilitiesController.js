const Facilities = require("../models/facilities");
const ErrorResponse = require("../utils/errorResponse");

// @Desc      Add new health tips
// @Route     Post api/v1/Facilities/
// @Access    Private
exports.handleAddFacilities = async (req, res, next) => {
  try {
    const data = await Facilities.create(req.body);

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get all health tips
// @Route     GET api/v1/Facilities/
// @Access    Private
exports.handleGetAllFacilities = async (req, res, next) => {
  try {
    const data = await Facilities.find(req.query);

    res.status(200).json({ status: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get Single health tips
// @Route     GET api/v1/Facilities/:id
// @Access    Private
exports.handleGetOneFacilities = async (req, res, next) => {
  try {
    const data = await Facilities.findById(req.params.id);

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
// @Route     PUT api/v1/Facilities/:id
// @Access    Private
exports.handleUpdateFacilities = async (req, res, next) => {
  try {
    const data = await Facilities.findByIdAndUpdate(req.params.id, req.body, {
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
// @Route     DELETE api/v1/Facilities/:id
// @Access    Private
exports.handleDeleteFacilities = async (req, res, next) => {
  try {
    const data = await Facilities.findByIdAndDelete(req.params.id);

    // check is id is valid
    if (!data) {
      return next(new ErrorResponse("invalid id", 404));
    }

    res.status(200).json({ status: true, data: data });
  } catch (err) {
    next(err);
  }
};
