const User = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports.create = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.json(500, {
        success: false,
        error: "User Id Already Exist",
      });
    }

    if (req.body.password !== req.body.confirm_password) {
      return res.json(500, {
        success: false,
        error: "Password and Confirm Password don't match",
      });
    }

    user = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });

    return res.json(200, {
      success: true,
      error: null,
      message: "User Created Successfully",
    });
  } catch (err) {
    console.log("Error in Sign Up", err);
    return res.json(500, {
      success: false,
      error: err,
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json(500, {
        success: false,
        error: "Invalid User Id / Wrong Password",
      });
    }

    if (user.password !== req.body.password) {
      return res.json(500, {
        success: false,
        error: "Invalid User Id / Wrong Password",
      });
    }

    return res.json(200, {
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), "Moderno", {
          expiresIn: "1000000",
        }),
      },
      message: "User login success",
    });
  } catch (err) {
    console.log("Error in Log In", err);
    return res.json(500, {
      success: false,
      error: err,
    });
  }
};
