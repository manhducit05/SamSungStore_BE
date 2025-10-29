const mongoose = require("mongoose");
const generate = require("../admin/helpers/generate")

const notificationsSchema = new mongoose.Schema(
  {
    product: String,
    message: String,
    phoneNumber: Number,
    email: String,
    type: { type: String, required: true },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Notification = mongoose.model('Notifications', notificationsSchema, "notifications");

module.exports = Notification;