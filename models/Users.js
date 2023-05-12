const mongo = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypyo = require("crypto");

const userSchema = mongo.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full name required"],
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email required"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "Incorrect email formate",
      ],
    },

    tel: {
      type: String,
      trim: true,
      default: null,
    },

    category: {
      type: String,
      required: [true, "category can not but empty"],
      enum: ["facility owner", "farmer"],
    },

    isNotification: {
      type: Boolean,
      default: false,
    },

    bookmark: {
      type: [],
    },

    post: {
      type: [],
    },

    imgUrl: {
      type: String,
      default: null,
    },

    address: {
      type: String,
      trim: true,
      default: null,
    },

    password: {
      type: String,
      required: [true, "Password required"],
      minlenght: [6, "Password cannot be lesss than 6 characters"],
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    resetPasswordToken: { type: String, default: null },

    resetPasswordExpire: { type: Date, default: null },
  },

  { timestamps: true }
);

// Generate password hash and salt middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign jwt and return
userSchema.methods.getSignJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// match user password
userSchema.methods.matchPassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

// generate hash password for fortpassword
userSchema.methods.resetTokenModel = async function () {
  // generate the token
  const resetToken = crypyo.randomBytes(4).toString("hex");
  this.resetPasswordToken = crypyo
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongo.model("users", userSchema);
