const jwt = require("jsonwebtoken");
const adminModel = require("../models/teacher.model");

async function authAdmin(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRATE
        );

        const admin = await adminModel.findById(decoded.id).select("+isAdmin");;
       
        
        if (!admin || !admin.isAdmin) {
            return res.status(403).json({
                message: "Admin access denied"
            });
        }

        req.admin = admin;
        next();

    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {authAdmin};