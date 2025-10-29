const mongoose = require("mongoose");
const generate = require("../admin/helpers/generate")

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    username: String,
    password: String,
    token: {
      type: String,
      default: generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    status: String,
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

const User = mongoose.model('Users', userSchema, "users");

module.exports = User;