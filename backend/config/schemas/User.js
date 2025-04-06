const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "intern"], default: "intern" },
        department: { type: String },
        joinDate: { type: Date, default: Date.now },
        application: {
            type: mongoose.Schema.Types.ObjectId, ref: "Application", required: function () {
                return this.role === "intern"
            }
        }
    },
    { timestamps: true }
);

const productModel = mongoose.model("User", userSchema);

module.exports = productModel;