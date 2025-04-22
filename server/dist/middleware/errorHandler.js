"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = require("../utils/appError");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    // Handle Prisma errors
    if (err.name === "PrismaClientKnownRequestError") {
        return res.status(400).json({
            success: false,
            message: "Database error occurred",
        });
    }
    // Default error response
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};
exports.errorHandler = errorHandler;
