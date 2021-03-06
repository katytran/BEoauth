const User = require("../models/user");
const bcrypt = require("bcrypt");

const loginWithEmail = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({
      success: false,
      error: "cant find user// Wrong email or password",
    });

  console.log("user", user);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({
      success: false,
      error: " password// Wrong email or password",
    });

  accessToken = await user.generateToken();

  res.status(200).json({
    success: true,
    message: `Logged in successfully!`,
    token: accessToken,
  });
  return accessToken;
};

const loginWithOAuth = async ({ user }, res) => {
  if (user) {
    user = await User.findByIdAndUpdate(
      user._id,
      { avatarUrl: user.avatarUrl },
      { new: true }
    );
  } else {
    let newPassword = "" + Math.floor(Math.random() * 100000000);
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    user = await User.create({
      name: user.name,
      email: user.email,
      password: newPassword,
      avatarUrl: user.avatarUrl,
    });
  }
  const accessToken = await user.generateToken();
  res.send({ user, accessToken });
};

module.exports = {
  loginWithEmail,
  loginWithOAuth,
};
