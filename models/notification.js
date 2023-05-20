const mongoose = require("mongoose");

const NotificationScheme = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title can not but empty"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "description can not but empty"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "category can not but empty"],
      enum: ["facility owner", "farmer"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationScheme);
