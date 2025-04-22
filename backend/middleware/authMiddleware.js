const JWT = require("jsonwebtoken");
const User = require("../config/schemas/User");
const JWTKey = process.env.JWT_SECRET;

const authMiddleware = async (req, resp, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return resp.status(401).json({ message: "Invalid or expired token" });
        }

        const decoded = JWT.verify(token, JWTKey, async (err, result) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    resp.clearCookie("token", {
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax"
                    })
                    return resp.status(401).json({ message: 'Token Expired' });
                }
                return resp.sendStatus(403);
            } else if (!result) {
                return resp.status(404).json({ message: "User not found" });
            }

            const exclude = "-_id -password -__v";
            const user = await User.findById(result.id).select(exclude);

            req.user = user;
            next();
        });

    } catch (error) {
        return resp.status(401).json({ message: "Invalid or expired token" })
    }
};

module.exports = authMiddleware;
