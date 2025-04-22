const mongoose = require("mongoose");
const pathJump = "";
require("dotenv").config({ path: [`${pathJump}.env`, `${pathJump}.env.local`] });

const URI = `${process.env.MONGODB_URI}/IMS`;

mongoose.connect(URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));