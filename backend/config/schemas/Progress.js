const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema(
  {
    intern: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    submission: { type: String },
    feedback: { type: String },
    status: { type: String, enum: ["pending", "reviewed", "approved"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", ProgressSchema);