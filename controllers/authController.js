const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password required",
      });
    }

    const exists = await User.findOne({ username });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Error while login, please try again later.",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: password,
    });
    user.password = hash;
    res.status(400).json({
      success: false,
      message: "Error while login, please try again later",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    res.json({
      success: true,
      message: "Login Successful",
      data: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
