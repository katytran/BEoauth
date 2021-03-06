const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      trim: true,
      minLength: 3,
    },
    //validate the email to make sure it is indeed a valid emai

    email: {
      type: String,
      required: [true, "User must have an email"],
      trim: true,
      //email field is required and must be unique
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "User must have a password"],
    },
  },

  //timestamps:true
  //mongoose will automatically create 2 fields: createdAt and updatedAt

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  return obj;
};

userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  const userObj = new this(); // create a new User class
  this.findOne({ email: profile.email }, async function (err, result) {
    if (!result) {
      let newPassword =
        profile.password || "" + Math.floor(Math.random() * 100000000);
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      userObj.name = profile.name;
      userObj.email = profile.email;
      userObj.password = newPassword;
      userObj.googleId = profile.googleId;
      userObj.facebookId = profile.facebookId;
      userObj.avatarUrl = profile.avatarUrl;
      userObj.save(cb);
    } else {
      cb(err, result);
    }
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
