const User = require("../config/schemas/User");

const getAdmin = async (user, resp, select) => {
    try {
        if (!user?.email) {
            resp.status(400).json({
                success: false,
                message: "User email is missing from token.",
            });
            return null;
        }

        const admin = await User.findOne({ email: user.email }).select(select);
        if (!admin) {
            resp.status(404).json({
                success: false,
                message: "Admin data not found.",
                data: [],
            });
            return null;
        }

        return admin._id;
    } catch (error) {
        console.error("Error getting admin ID:", error.message);
        resp.status(500).json({
            success: false,
            message: "Server error while fetching admin ID.",
            error: error.message,
        });
        return null;
    }
};

module.exports = getAdmin;