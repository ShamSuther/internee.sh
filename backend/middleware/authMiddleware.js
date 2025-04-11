const JWT = require("jsonwebtoken");
const User = require("../config/schemas/User");
const JWTKey = process.env.JWT_SECRET;

const authMiddleware = async (req, resp, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return resp.status(401).json({ message: "Invalid or expired token" });
        }

        const decoded = JWT.verify(token, JWTKey);
        const exclude = "-_id -password -__v";
        const user = await User.findById(decoded.id).select(exclude);

        if (!user) {
            return resp.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return resp.status(401).json({ message: "Invalid or expired token" })
    }
};

module.exports = authMiddleware;
