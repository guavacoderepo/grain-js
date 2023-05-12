const Weightloss = require("../models/Weightloss");
const ErrorResponse = require("../utils/errorResponse");

// @Desc      Add new health tips
// @Route     Post api/v1/Weightloss/
// @Access    Private
exports.handleAddWeightloss = async (req, res, next) => {
  try {
    const data = await Weightloss.create(req.body);

    res.status(200).json({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get all health tips
// @Route     GET api/v1/Weightloss/
// @Access    Private
exports.handleGetAllWeightloss = async (req, res, next) => {
  try {
    const data = await Weightloss.find(req.query);

    res.status(200).json({ status: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};

// @Desc      Get Single health tips
// @Route     GET api/v1/Weightloss/:id
// @Access    Private
exports.handleGetOneWeightloss = async (req, res, next) => {
  try {
    const data = await Weightloss.findById(req.params.id);

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
// @Route     PUT api/v1/Weightloss/:id
// @Access    Private
exports.handleUpdateWeightloss = async (req, res, next) => {

    
  try {
    const data = await Weightloss.findByIdAndUpdate(
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
// @Route     DELETE api/v1/Weightloss/:id
// @Access    Private
exports.handleDeleteWeightloss = async (req, res, next) => {
  try {
    const data = await Weightloss.findByIdAndDelete(req.params.id);

    // check is id is valid
    if (!data) {
      return next(new ErrorResponse("invalid id", 404));
    }

    res.status(200).json({ status: true });
  } catch (err) {
    next(err);
  }
};
