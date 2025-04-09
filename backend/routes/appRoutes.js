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
        const result = await userData.save();

        resp.status(201).send({
            success: true,
            message: "Application registered successfully!",
            data: result
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

router.get("/:application_id", (req, resp) => {
    const { application_id } = req.params;
    console.log("get application " + application_id);
})

router.put("/:application_id", async (req, resp) => {
    const { application_id } = req.params;
    console.log("update application " + application_id);
})

module.exports = router;

// POST /apply	Submit a job application	    Public
// GET	/	    Get all applications (Admin)	Admin
// GET	/:id	Get a specific application	    Admin
// PUT	/:id	Update application status	    Admin