const NotificationSchema = {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  // Other notification-related fields can be added based on your requirements
};

module.exports = mongoose.model("Notification", NotificationSchema);
