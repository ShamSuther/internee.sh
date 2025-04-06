const express = require("express");
const router = express.Router();
const initialRoute = "/notifications"

router.get("/", (req, resp) => {
    resp.send("get all notifications!");
})

router.post("/", (req, resp) => {
    const intern_id = req.params.intern_id;
    resp.send("intern progress: " + intern_id);
})

module.exports = router;

// initial route /notifications
// GET	/	(Get all notifications)     Authenticated
// POST	/	(Send a new notification)	Admin