const express = require("express");
const router = express.Router();
const Task = require("../config/schemas/Task");
const { authMiddleware, requireAdmin } = require("../middleware");
const getCurrentUser = require("../utils");


router.post("/", (req, resp) => {
    resp.send("create new task!");
})

// get all tasks

router.get("/", authMiddleware, requireAdmin, async (req, res) => {
    try {
        const tasks = await Task.find().select("-__v").populate({ path: "assignedTo", select: "_id title" });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
});

router.get("/:id", (req, resp) => {
    const id = req.params.id;
    resp.send("update: " + id);
})

router.put("/:id", (req, resp) => {
    const id = req.params.id;
    resp.send("update task: " + id);
})

router.delete("/:id", (req, resp) => {
    const id = req.params.id;
    resp.send("delete a task: " + id);
})

module.exports = router;

// initial route /tasks
// POST	/	(Create a new task)	Admin
// GET	/	(Get all tasks)	Admin)
// GET	/:id	(Get a specific task)	Admin/Intern
// PUT	/:id	(Update task details)	Admin
// DELETE	/:id	(Delete a task)	Admin