const express = require("express");
const router = express.Router();

router.post("/", (req, resp) => {
    resp.send("create new task!");
})

router.get("/", (req, resp) => {
    resp.send("get all tasks!");
})

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