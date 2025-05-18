const express = require("express");
const router = express.Router();
const Job = require("../config/schemas/Job");
const User = require("../config/schemas/User");
const { authMiddleware, requireAdmin } = require("../middleware/index");
const getCurrentUser = require("../utils");


// POST /jobs - Create a new job posting (Admin only)
router.post("/", authMiddleware, requireAdmin, async (req, resp) => {
    try {
        const req_data = req.body;
        if (!req_data || Object.keys(req_data).length === 0) {
            return resp.status(400).json({ success: false, message: "No job data provided!" });
        }

        const adminId = await getCurrentUser(req.user, resp);
        if (!adminId) {
            return;
        }

        const jobData = {
            ...req_data,
            status: req_data.status || "open",
            postedBy: adminId,
        };

        console.log(jobData);

        const job = new Job(jobData);
        const savedJob = await job.save();

        resp.status(201).json({ success: true, message: "Job posted successfully!", data: savedJob });
    } catch (error) {
        resp.status(500).json({ success: false, message: "Error posting job", error: error.message });
    }
});

// GET /jobs | Get all job postings
router.get("/", authMiddleware, requireAdmin, async (req, resp) => {
    try {
        const { email } = req.user;

        const admin = await User.findOne({ email }).select("_id");
        if (!admin) {
            return resp.status(404).json({
                success: false,
                message: "Admin data not found.",
                data: []
            });
        }

        const jobs = await Job.find({ postedBy: admin._id }).select("-__v");
        if (!jobs || jobs.length === 0) {
            return resp.status(404).json({
                success: false,
                message: "No jobs found.",
                data: [],
            });
        }

        return resp.status(200).json({
            success: true,
            message: "Jobs fetched successfully.",
            data: jobs,
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return resp.status(500).json({
            success: false,
            message: "Server error while fetching jobs.",
            error: error.message,
        });
    }
});


// GET /jobs/:job_id - Get a specific job (Public)
router.get("/:job_id", async (req, res) => {
    try {
        const { job_id } = req.params;

        console.log(job_id);

        const job = await Job.findById({ _id: job_id }).populate({ path: "postedBy", select: "-__v -password -joinDate -createdAt -updatedAt" }).select("-__v").exec();

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Job fetched successfully.",
            data: job,
        });
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching job.",
            error: error.message,
        });
    }
});

// PUT /jobs/:job_id - Update a job (Admin only)
router.put("/:job_id", authMiddleware, requireAdmin, async (req, res) => {
    try {
        const { job_id } = req.params;
        const updates = req.body;

        const updatedJob = await Job.findByIdAndUpdate(job_id, updates, { new: true, runValidators: true });
        if (!updatedJob) {
            return res.status(404).json({ success: false, message: "Job not found!" });
        }

        res.json({ success: true, message: "Job updated successfully!", data: updatedJob });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating job", error: error.message });
    }
});

// DELETE /jobs/:job_id - Delete a job (Admin only)
router.delete("/", authMiddleware, requireAdmin, async (req, res) => {
    try {
        const jobIDs = req.body;

        if (!Array.isArray(jobIDs) || jobIDs.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No job IDs provided for deletion.",
            });
        }

        const result = await Job.deleteMany({ _id: { $in: jobIDs } });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs were deleted. Please check the provided IDs.",
            });
        }

        res.json({
            success: true,
            message: `${result.deletedCount} job(s) deleted successfully.`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting jobs",
            error: error.message,
        });
    }
});


module.exports = router;

// POST	/	Create a new job posting	Admin
// GET	/	Get all job postings	Public
// GET	/:id	Get a specific job posting	Public
// PUT	/:id	Update job posting	Admin
// DELETE	/:id	Delete job posting	Admin