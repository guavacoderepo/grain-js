const mongoose = require("mongoose");

const faciitiesSchema = mongoose.Schema(
  {
    size: {
      type: String,
      required: [true, "size can not but empty"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "location can not but empty"],
      trim: true,
    },

    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "user can not but empty"],
    },

    description: {
      type: String,
      required: [true, "description can not but empty"],
      trim: true,
    },

    number: {
      type: String,
      required: [true, "number can not but empty"],
      trim: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("faciities", faciitiesSchema);
