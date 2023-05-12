const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token can not but empty"],
      unique: true,
    },

    user: {
      type: String,
      required: [true, "user can not but empty"],
      trim: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("tokens", tokenSchema);
