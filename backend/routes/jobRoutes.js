const express = require("express");
const router = express.Router();
const Job = require("../config/schemas/Job");
const { authMiddleware, requireAdmin } = require("../middleware/index");

// POST /jobs - Create a new job posting (Admin only)
router.post("/", authMiddleware, requireAdmin, async (req, res) => {
    try {
        const req_data = req.body;
        if (!req_data || Object.keys(req_data).length === 0) {
            return res.status(400).json({ success: false, message: "No job data provided!" });
        }

        const job = new Job(req_data);
        await job.save();

        res.status(201).json({ success: true, message: "Job posted successfully!", data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error posting job", error: error.message });
    }
});

// GET /jobs - Get all job postings (Public)
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().select("-postedBy"); // Hides admin reference
        if (jobs.length > 0) {
            res.json({ success: true, data: jobs });
        } else {
            res.status(404).json({ success: false, message: "No jobs found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET /jobs/:job_id - Get a specific job (Public)
router.get("/:job_id", async (req, res) => {
    try {
        const { job_id } = req.params;

        console.log(job_id);

        const job = await Job.findById(job_id).select("-__v");

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
router.delete("/:job_id", authMiddleware, requireAdmin, async (req, res) => {
    try {
        const { job_id } = req.params;
        const deletedJob = await Job.findByIdAndDelete(job_id);

        if (!deletedJob) {
            return res.status(404).json({ success: false, message: "Job not found!" });
        }

        res.json({ success: true, message: "Job deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting job", error: error.message });
    }
});

module.exports = router;

// POST	/	Create a new job posting	Admin
// GET	/	Get all job postings	Public
// GET	/:id	Get a specific job posting	Public
// PUT	/:id	Update job posting	Admin
// DELETE	/:id	Delete job posting	Admin