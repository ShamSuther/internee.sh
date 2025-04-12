const express = require("express");
const router = express.Router();
const Application = require("../config/schemas/Application");

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

router.get("/", (req, resp) => {
    resp.send("get all applications!");
})

// GET applicant id
router.get("/status", async (req, res) => {
    const { applicationID } = req.query;

    if (!applicationID) {
        return res.status(400).json({ success: false, message: "ApplicationID is required" });
    }

    try {
        const applicant = await Application.findOne({ _id: applicationID }).select("-_id -__v");
        console.log(applicant);
        if (!applicant) {
            return res.status(404).json({ success: false, message: "Applicant not found" });
        }

        res.status(200).json({ success: true, data: applicant });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

router.put("/:application_id", async (req, resp) => {
    const { application_id } = req.params;
    console.log("update application " + application_id);
})

module.exports = router;

// POST /apply	Submit a job application	    Public
// GET	/	    Get all applications (Admin)	Admin
// GET	/:id	Get a specific application	    Admin
// PUT	/:id	Update application status	    Admin