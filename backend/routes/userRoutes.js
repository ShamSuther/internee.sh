const express = require("express");
const router = express.Router();
const User = require("../config/schemas/User");
const { authMiddleware, requireAdmin } = require("../middleware");

// get all users
router.get("/", authMiddleware, requireAdmin, async (req, resp) => {
    try {
        const adminId = await getAdmin(req.user, resp, "_id");
        if (!adminId) {
            return;
        }

        const excluded = "-password -__v -createdAt -updatedAt";
        const users = await User.find({ _id: { $ne: adminId } }).select(excluded);
        resp.status(200).json({
            success: true,
            message: "Users fetched successfully.",
            data: users,
        });
    } catch (error) {
        resp.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message,
        });
    }
});

// get specific user
router.get("/:user_id", authMiddleware, async (req, resp) => {
    const { user_id } = req.params;

    try {
        // Validate ObjectId format before querying
        if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
            return resp.status(400).json({
                success: false,
                message: "Invalid user ID format.",
            });
        }

        const user = await User.findOne({ _id: user_id }).select("-__v -_id -password");

        if (!user) {
            return resp.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return resp.status(200).json({
            success: true,
            message: "User fetched successfully.",
            data: user,
        });

    } catch (error) {
        console.error("Error fetching user:", error);
        return resp.status(500).json({
            success: false,
            message: "Server error while fetching user.",
            error: error.message,
        });
    }
});

router.put("/:id", (req, resp) => {
    const id = req.params.id;
    resp.send("update: " + id);
})

router.delete("/:id", (req, resp) => {
    const id = req.params.id;
    resp.send("removed: " + id);
})

module.exports = router;

// initial route /users
// GET	/	(Get all interns)	Admin
// GET	/:id	(Get a specific intern profile)	Admin
// PUT	/:id	(Update intern profile/details)	Admin
// DELETE	/:id	(Remove an intern from the system)	Admin