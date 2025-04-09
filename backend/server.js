require("./config");
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

// Middleware to handle unknown routes

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "API endpoint not found" });
});

app.listen(3000, () => {
    console.log("Backend server listening on port 3000");
});