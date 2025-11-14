const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        permissions: {
            type: Array,
            default: []  // Ví dụ: ["product.read", "product.create"]
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Tự tạo createdAt & updatedAt
    }
);

module.exports = mongoose.model("Role", RoleSchema);
