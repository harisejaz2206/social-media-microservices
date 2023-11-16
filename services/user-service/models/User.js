const mongoose = require("mongoose");

const UserSchema = {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  // Other user-related fields can be added based on your requirements
};

module.exports = mongoose.model("User", UserSchema);
