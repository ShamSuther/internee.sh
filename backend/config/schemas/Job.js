const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true, minlength: 30 },
        requirements: {
            type: [String],
            default: [],
            validate: {
                validator: (arr) => arr.length > 0,
                message: "At least one requirement is required.",
            },
        },
        category: { type: String, required: true },
        type: { type: String, enum: ["remote", "part-time", "full-time"], required: true },
        location: {
            type: String,
            required: true,
            default: "Remote",
        },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin who posted
        status: { type: String, enum: ["open", "closed"], default: "open" },
        postedAt: { type: Date, default: Date.now }
    }
);

const JobModel = mongoose.model("Job", JobSchema);

module.exports = JobModel;