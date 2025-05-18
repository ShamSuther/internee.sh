const User = require("../config/schemas/User");

const getCurrentUser = async (user, resp) => {
    try {
        if (!user?.email) {
            resp.status(400).json({
                success: false,
                message: "User email is missing from token.",
            });
            return null;
        }

        const currentUser = await User.findOne({ email: user.email }).select("_id");
        if (!currentUser) {
            resp.status(404).json({
                success: false,
                message: "User data not found.",
                data: [],
            });
            return null;
        }

        return currentUser._id;
    } catch (error) {
        console.error("Error getting User ID:", error.message);
        resp.status(500).json({
            success: false,
            message: "Server error while fetching User ID.",
            error: error.message,
        });
        return null;
    }
};

module.exports = getCurrentUser;