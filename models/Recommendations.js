const mongoose = require("mongoose");

const recommendationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title can not but empty"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category can not but empty"],
      enum: ["exercise", "diet"],
    },

    description: {
      type: String,
      required: [true, "description can not but empty"],
      trim: true,
    },

    imgUrl: {
      type: String,
      required: [true, "imgurl can not but empty"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("recommendations", recommendationSchema);
