const express = require("express");
const router = express.Router();

const auth = require("./authRoutes");
const jobs = require("./jobRoutes");
const users = require("./userRoutes");
const tasks = require("./taskRoutes");
const progress = require("./progressRoutes");
const notifications = require("./notifications");
const applications = require("./appRoutes");

router.use("/auth", auth);
router.use("/users", users);
router.use("/jobs", jobs);
router.use("/tasks", tasks);
router.use("/progress", progress);
router.use("/notifications", notifications);
router.use("/applications", applications);

module.exports = router;