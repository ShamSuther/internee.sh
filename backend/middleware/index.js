const authMiddleware = require("./authMiddleware");
const requireAdmin = require("./requireAdmin");

module.exports = {
    authMiddleware,
    requireAdmin
};