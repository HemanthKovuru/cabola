const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: {
    type: "string",
    required: [true, "please provide your firstname."],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please provide your lastname."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Please provide a password"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide a confirmPassword"],
    minlength: 8,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passowrd does not match.",
    },
  },
  role: {
    type: String,
    required: [true, "Please select an option"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  coordinateX: {
    type: Number,
    // required: [true, "please provide a x-coordinate"],
  },
  coordinateY: {
    type: Number,
    // required: [true, "please provide a y-coordinate"],
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  if (this.role === "rider") {
    this.coordinateX = 0;
    this.coordinateY = 0;
  }

  next();
});

// methods
// check passwords match
userSchema.methods.checkPassword = async function (inputPass, dbPass) {
  return await bcrypt.compare(inputPass, dbPass);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
