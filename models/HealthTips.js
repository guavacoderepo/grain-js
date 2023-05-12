const mongoose = require("mongoose");

const healthTipsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title can not but empty"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category can not but empty"],
      enum: ["Temperature", "Blood pressure", "Heart rate"],
    },

    status: {
      type: String,
      required: [true, "status can not but empty"],
      enum: ["High", "Low", "Average"],
    },

    description: {
      type: String,
      required: [true, "description can not but empty"],
      trim: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("healthtips", healthTipsSchema);
