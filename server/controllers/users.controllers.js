const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    accessToken = await user.generateToken();

    res.status(201).json({
      success: true,
      data: user,
      message: `User ${user.name} created`,
    });

    return accessToken;
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user)
    return res.status(400).json({
      success: false,

      error: "User not found!",
    });
  return res.status(200).json({
    success: true,
    data: user,
    message: "Get current user successfully!",
  });
};

const updateProfile = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user)
    return res.status(400).json({
      success: false,

      error: "User not found!",
    });
  const newUserProfile = {
    ...user,
    name: req.body.name,
  };
  return res.status(200).json({
    success: true,
    data: newUserProfile,
    message: "Update user successfully!",
  });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateProfile,
};
