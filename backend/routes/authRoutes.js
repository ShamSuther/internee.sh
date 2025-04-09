const express = require("express");
const router = express.Router();
const User = require("../config/schemas/User");

router.post("/register", async (req, resp) => {
    try {
        const req_data = req.body;
        if (!req_data || Object.keys(req_data).length === 0) {
            return resp.status(400).send({
                success: false,
                message: "No application data provided."
            });

        }

        const userData = new User(req_data);
        let result = await userData.save();

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

router.post("/login", (req, resp) => {
    resp.send("login!");
})

router.get("/profile", (req, resp) => {
    resp.send("Profile!");
})

router.get("/user/:user_id", async (req, resp) => {
    const { user_id } = req.params;
    const user = await User.findOne({ _id: user_id }).select("-__v -_id -password");
    if (user) {
        resp.send(user);
    } else {
        resp.send({ message: "No User found!" });
    }
})

router.post("/logout", (req, resp) => {
    resp.send("logged out!");
})

module.exports = router;

// initial route /auth
// POST /register access admin
// POST	/login public
// GET	/profile Authenticated
// POST	/logout Authenticated