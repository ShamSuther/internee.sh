const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
    {
        job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
        applicantName: { type: String, required: true },
        expectations: { type: String },
        email: { type: String, required: true },
        mobileNumber: { type: String, required: true },
        experienceYears: { type: Number, required: true },
        cv: { type: String, required: true }, // Store file path or URL
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    },
    { timestamps: true }
);

const applicationModel = mongoose.model("Application", ApplicationSchema);

module.exports = applicationModel;
