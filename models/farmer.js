const mongoose = require("mongoose");

const farmsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name can not but empty"],
      trim: true,
    },

    specie: {
      type: String,
      required: [true, "specie can not but empty"],
      trim: true,
    },

    plantDate: {
      type: Date,
      required: [true, "date can not but empty"],
    },

    location: {
      type: String,
      required: [true, "location can not but empty"],
      trim: true,
    },

    farmSize: {
      type: String,
      required: [true, "Farm size can not but empty"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "description can not but empty"],
      trim: true,
    },

    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "user can not but empty"],
    },

    tel: {
      type: String,
      required: [true, "phone number can not but empty"],
      trim: true,
    },

    cropDuration: {
      type: Date,
      required: [true, "crop duration can not but empty"],
    },

    imgUrl: {
      type: String,
      default: null,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("farmers", farmsSchema);
