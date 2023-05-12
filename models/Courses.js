const mongoose = require("mongoose");

const CoursesScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name can not but empty"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "category can not but empty"],
      enum: ["beginners", "intermediate", "expert"],
    },

    subCategory: {
      type: String,
      required: [true, "sub category can not but empty"],
      enum: ["ab", "butt", "leg", "full", "cardio", "arm"],
    },

    description: {
      type: String,
      required: [true, "description can not but empty"],
      trim: true,
    },

    imgUrl: {
      type: String,
      required: [true, "imgUrl can not but empty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", CoursesScheme);
