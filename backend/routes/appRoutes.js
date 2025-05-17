const express = require("express");
const router = express.Router();
const Application = require("../config/schemas/Application");
const { authMiddleware, requireAdmin } = require("../middleware");
const mongoose = require("mongoose");

// apply to a job
router.post("/apply", async (req, resp) => {
    try {
        const req_data = req.body;

        if (!req_data || Object.keys(req_data).length === 0) {
            return resp.status(400).send({
                success: false,
                message: "No application data provided."
            });
        }

        const userData = new Application(req_data);
        const request = await userData.save();
        const data = request.toObject();

        delete data.__v;

        resp.status(201).send({
            success: true,
            message: "Application registered successfully!",
            data: data
        });
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "An error occurred while registering the application.",
            error: error.message
        });
    }
})

// get all applications
router.get("/", authMiddleware, requireAdmin, async (req, resp) => {
    try {
        const applications = await Application.find()
            .select("-__v")
            .populate({
                path: "job_id",
                select: "title", // Fetch only the title
            });

        if (!applications || applications.length === 0) {
            return resp.status(404).json({
                success: false,
                message: "No applications found.",
                data: [],
            });
        }

        // Flatten job title into jobTitle
        const flattenedApps = applications.map((app) => ({
            _id: app._id,
            applicantName: app.applicantName,
            expectations: app.expectations,
            email: app.email,
            mobileNumber: app.mobileNumber,
            experienceYears: app.experienceYears,
            cv: app.cv,
            status: app.status,
            createdAt: app.createdAt,
            updatedAt: app.updatedAt,
            jobTitle: app.job_id?.title || "Unknown",
        }));

        return resp.status(200).json({
            success: true,
            message: "Applications fetched successfully.",
            data: flattenedApps,
        });

    } catch (error) {
        console.error("Error fetching applications:", error);

        return resp.status(500).json({
            success: false,
            message: "Server error while fetching applications.",
            error: error.message,
        });
    }
});


// GET applicant id
router.get("/status", authMiddleware, async (req, res) => {
    const { applicationID } = req.query;

    if (!applicationID) {
        return res.status(400).json({ success: false, message: "ApplicationID is required" });
    }

    try {
        const applicant = await Application.findOne({ _id: applicationID }).select("-_id -__v");

        if (!applicant) {
            return res.status(404).json({ success: false, message: "Applicant not found" });
        }

        res.status(200).json({ success: true, data: applicant });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

// update application status
router.put("/:application_id", authMiddleware, requireAdmin, async (req, resp) => {
    const { application_id } = req.params;
    const applicationStatus = ["pending", "accepted", "rejected"];
    const updates = req.body;

    try {
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(application_id)) {
            return resp.status(400).json({
                success: false,
                message: "Invalid application ID format.",
            });
        }

        // Validate status if it's being updated
        if (updates.status && !applicationStatus.includes(updates.status)) {
            return resp.status(400).json({
                success: false,
                message: "Invalid status value. Allowed: pending, accepted, rejected.",
            });
        }

        const updatedApp = await Application.findByIdAndUpdate(
            application_id,
            { $set: updates },
            { new: true, runValidators: true, context: "query" }
        ).select("-__v");

        if (!updatedApp) {
            return resp.status(404).json({
                success: false,
                message: "Application not found.",
            });
        }

        return resp.status(200).json({
            success: true,
            message: "Application updated successfully.",
            data: updatedApp,
        });

    } catch (error) {
        console.error("Error updating application:", error);
        return resp.status(500).json({
            success: false,
            message: "Server error while updating application.",
            error: error.message,
        });
    }
});


module.exports = router;

// POST /apply	    Submit a job application	    Public
// GET	/	        Get all applications (Admin)	Admin
// GET	/status	    Get application status          Authorized
// PUT	/:id	    Update application status	    Authorized