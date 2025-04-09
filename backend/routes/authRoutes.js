const express = require("express");
const router = express.Router();
const User = require("../config/schemas/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const JWTKey = process.env.JWT_SECRET;

router.post("/register", async (req, resp) => {
    try {
        const req_data = req.body;
        if (!req_data || Object.keys(req_data).length === 0) {
            return resp.status(400).send({
                success: false,
                error: true,
                message: "No application data provided."
            });

        }

        const userData = new User(req_data);
        let result = await userData.save();

        resp.status(201).send({
            success: true,
            message: "User registered successfully!",
            data: result
        });
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "An error occurred while registering the user.",
            error: error.message
        });
    }
})

router.post("/login", async (req, resp) => {
    try {
        const req_data = req.body;
        if (!req_data || Object.keys(req_data).length === 0) {
            return resp.status(400).send({
                success: false,
                error: true,
                message: "No login data provided."
            });
        }

        const { email, password } = req_data;

        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(404).json({ message: "No user found with this email." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return resp.status(401).json({ message: "Invalid password." });
        }

        const { password: _, __v, ...user_data } = user.toObject();

        const token = JWT.sign({ id: user._id, role: user.role }, JWTKey, { expiresIn: "2h" });

        resp.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });

        resp.status(201).send({
            success: true,
            error: false,
            message: "User login successful!",
            data: user_data,
        });
    } catch (error) {
        resp.status(500).send({
            success: false,
            error: true,
            message: error.message || "An error occurred while logging in."
        });
    }
})

router.get("/check", authMiddleware, (req, resp) => {
    resp.json({
        loggedIn: true,
        user: req.user
    });
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