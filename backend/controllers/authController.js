const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

// create token
const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// send token
const sendToken = (user, statusCode, res) => {
  const token = getToken(user._id);

  res.cookie("jwt", token, {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN + 24 * 60 * 60 * 1000
    ),
  });

  user.password = undefined;
  user.__v = undefined;
  user.confirmPassword = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// signup
exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      role,
      coordinateX,
      coordinateY,
    } = req.body;

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      role,
      coordinateX,
      coordinateY,
    });

    if (!user) {
      let err = new Error("signup failed");
      err.statusCode = 400;
      return next(err);
    }

    // send response and token
    sendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// signin
exports.signin = async (req, res, next) => {
  try {
    // check if there is email and password
    const { password, email } = req.body;
    if (!password || !email) {
      let err = new Error("Please provide email and password");
      err.statusCode = 400;
      return next(err);
    }

    // check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password))) {
      let err = new Error("Incorrect  email or password");
      err.statusCode = 400;
      return next(err);
    }
    // send token
    sendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// signout
exports.signout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      status: "success",
      message: "Logged out successfull",
    });
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
};

// updateme

exports.updateLocation = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      coordinateX: req.body.x,
      coordinateY: req.body.y,
    });
    sendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
