const mongoose = require("mongoose");

const faciitiesSchema = mongoose.Schema(
  {
    size: {
      type: String,
      required: [true, "size can not but empty"],
      trim: true,
    },

    name: {
      type: String,
      required: [true, "name can not but empty"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "location can not but empty"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "description can not but empty"],
      trim: true,
    },

    tel: {
      type: String,
      required: [true, "number can not but empty"],
      trim: true,
    },

    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "user can not but empty"],
    },

    imgUrl: {
      type: String,
      default: null,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("faciities", faciitiesSchema);
