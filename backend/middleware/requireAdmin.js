const requireAdmin = (req, resp, next) => {
    if (!req.user || req.user.role !== "admin") {
        return resp.status(403).json({ success: false, message: "Access denied. Admins only" });
    }
    next();
}

module.exports = requireAdmin;