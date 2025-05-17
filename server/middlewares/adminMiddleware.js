const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ status: "fail", message: "Admin access required!" });
    }
    next();
};

module.exports = adminMiddleware;
