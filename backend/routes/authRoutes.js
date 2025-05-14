const express = require("express");
const router = express.Router();
const User = require("../config/schemas/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { authMiddleware, requireAdmin } = require("../middleware");
const JWTKey = process.env.JWT_SECRET;



// register user

router.post("/register", async (req, resp) => {
    try {
        const userData = req.body;

        if (!userData || Object.keys(userData).length === 0) {
            return resp.status(400).json({
                success: false,
                message: "No user data provided."
            });
        }

        const { email, password } = userData;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resp.status(409).json({
                success: false,
                message: "User with this email already exists."
            });
        }

        // Validate password
        if (!password || password.length < 6) {
            return resp.status(400).json({
                success: false,
                message: "Password is required and must be at least 6 characters long."
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        userData.password = hashedPassword;

        // Create and save user
        const newUser = new User(userData);
        const savedUser = await newUser.save();

        // Sanitize output
        const { __v, password: _, createdAt, updatedAt, ...publicData } = savedUser.toObject();

        // Generate JWT token
        const token = JWT.sign(
            { id: publicData._id, role: publicData.role },
            JWTKey,
            { expiresIn: "24h" }
        );

        // Set token cookie
        resp.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        return resp.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: publicData
        });

    } catch (error) {
        console.error("Registration error:", error);
        return resp.status(500).json({
            success: false,
            message: "An error occurred while registering the user.",
            error: error.message
        });
    }
});

// login user
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

        const { password: _, _id, __v, ...user_data } = user.toObject();

        const token = JWT.sign({ id: user._id, role: user.role }, JWTKey, { expiresIn: "24h" });

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

// logout
router.post("/logout", (req, resp) => {
    resp.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    resp.status(200).send({
        success: true,
        message: "Logged out successfully!",
    });
})

module.exports = router;

// initial route /auth
// POST /register   admin
// POST	/login      public
// POST	/check      Authenticated
// POST	/logout     Authenticated