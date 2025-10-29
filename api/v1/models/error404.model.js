const mongoose = require("mongoose");

const Error404Schema = new mongoose.Schema(
  {
    title: String,
    thumbnail: String,
  }, {
  timestamps: {
    createdAt: "created_at",
  }
}
);

const Error404 = mongoose.model('Error404', Error404Schema, "error404");

module.exports = Error404;