const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    match: /^\d{10}$/, // validate: /^\d{10}$/
  },
  password: {
    type: String,
    minLength: 6,
  },
  authType: {
    type: String,
    enum: ["google", "facebook", "local"],
    default: "local",
  },
  authGoogleID: {
    type: String,
    default: null,
  },
  authFacebookID: {
    type: String,
    default: null,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.authType != 'local') return next();
    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(this.password, salt);
    this.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.verifyPassword = async function (reqPassword, next) {
  try {
    return await bcryptjs.compare(reqPassword, this.password);
  } catch (error) {
    next(error);
  }
};
module.exports = User = mongoose.model("User", userSchema);
