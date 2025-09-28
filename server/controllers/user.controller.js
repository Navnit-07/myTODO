const User = require("../models/user.model");

exports.getUserData = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);

    if (!user) {
      res.status(500).json({
        success: false,
        message: "DB Error",
      });
    }

    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
