const express = require("express");
const router = express.Router();
const initialRoute = "/jobs"
const Job = require("../config/schemas/Job");
const crypto = require("node:crypto");

router.post("/", async (req, resp) => {
    const req_data = req.body;
    if (req_data) {
        const userData = new Job(req_data);
        let result = await userData.save();
        result = result.toObject();
        resp.send({ success: true, message: "job posted!" });
    } else {
        resp.send({ success: false, result: "job not posted!" });
    }
})

router.get("/", async (req, resp) => {
    const jobs = await Job.find().select("-postedBy");
    if (jobs.length > 0) {
        resp.send(jobs);
    } else {
        resp.send({ message: "No jobs found!" });
    }
})

router.get("/:job_id", async (req, resp) => {
    const { job_id } = req.params;
    const job = await Job.findOne({ _id: job_id });
    if (job) {
        resp.send(job);
    } else {
        resp.send({ message: "No Job found!" });
    }
})

router.put("/:job_id", (req, resp) => {
    const job_id = req.params.job_id;
    resp.send("update job: " + job_id);
})

router.delete("/:job_id", (req, resp) => {
    const job_id = req.params.job_id;
    resp.send("delete job: " + job_id);
})

module.exports = router;

// POST	/	Create a new job posting	Admin
// GET	/	Get all job postings	Public
// GET	/:id	Get a specific job posting	Public
// PUT	/:id	Update job posting	Admin
// DELETE	/:id	Delete job posting	Admin