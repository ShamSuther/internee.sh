const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dueDate: { type: Date },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
}, {
    timestamps: true
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;