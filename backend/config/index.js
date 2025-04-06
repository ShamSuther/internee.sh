const mongoose = require("mongoose");
require("dotenv").config({ path: [".env", ".env.local"] });

const URI = `${process.env.MONGODB_URI}/IMS`;

mongoose.connect(URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));