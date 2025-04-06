const express = require("express");
const router = express.Router();

router.post("/", (req, resp) => {
    resp.send("submit task progress!");
})

router.get("/:intern_id", (req, resp) => {
    const intern_id = req.params.intern_id;
    resp.send("intern progress: "+ intern_id);
})

router.put("/:intern_id", (req, resp) => {
    const intern_id = req.params.intern_id;
    resp.send("update: " + intern_id);
})

module.exports = router;

// initial route /progress
// POST	/	Submit task progress (Intern)	Intern
// GET	/:internId	(Get progress of a specific intern)	Admin
// PUT	/:id	(Update progress status/feedback)	Admin