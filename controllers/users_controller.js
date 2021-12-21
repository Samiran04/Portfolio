const User = require("../models/users");

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
        error: "Password and Confirm Password don't mactch",
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
    console.log("Error in home page", err);
    return res.json(500, {
      success: false,
      error: err,
    });
  }
};
