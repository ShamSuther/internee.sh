const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
}, {
    timestamps: true
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;