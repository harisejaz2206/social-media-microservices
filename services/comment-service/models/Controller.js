const CommentSchema = {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  // Other comment-related fields can be added based on your requirements
};

module.exports = mongoose.model("Comment", CommentSchema);
