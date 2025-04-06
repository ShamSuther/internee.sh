const express = require("express");
const router = express.Router();
const User = require("../config/schemas/User");

router.post("/register", async (req, resp) => {
    const req_data = req.body;
    if (req_data) {
        const userData = new User(req_data);
        let result = await userData.save();
        result = result.toObject();
        resp.send({ success: true, message: "user registered!" });
    } else {
        resp.send({ success: false, result: "user failed to register!" });
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