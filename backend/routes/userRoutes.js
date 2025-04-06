const express = require("express");
const router = express.Router();

router.get("", (req, resp) => {
    resp.send("get all users!");
})

router.get("/:id", (req, resp) => {
    const id = req.params.id;
    resp.send("user_id: " + id);
})

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