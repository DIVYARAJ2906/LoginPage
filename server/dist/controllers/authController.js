"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
const index_1 = require("../index");
const zod_1 = require("zod");
const appError_1 = require("../utils/appError");
const password_1 = require("../utils/password");
// Validation schemas
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required"),
});
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
async function login(req, res, next) {
    try {
        const validatedData = loginSchema.parse(req.body);
        const user = await index_1.prisma.user.findUnique({
            where: { email: validatedData.email },
        });
        if (!user || !user.password) {
            throw new appError_1.AppError("Invalid email or password", 401);
        }
        const isPasswordValid = await (0, password_1.comparePasswords)(validatedData.password, user.password);
        if (!isPasswordValid) {
            throw new appError_1.AppError("Invalid email or password", 401);
        }
        res.status(200).json({
            success: true,
            user: {
                email: user.email,
            },
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: error.errors[0].message,
            });
        }
        next(error);
    }
}
async function register(req, res, next) {
    try {
        const validatedData = registerSchema.parse(req.body);
        const existingUser = await index_1.prisma.user.findUnique({
            where: { email: validatedData.email },
        });
        if (existingUser) {
            throw new appError_1.AppError("Email already in use", 409);
        }
        const hashedPassword = await (0, password_1.hashPassword)(validatedData.password);
        const newUser = await index_1.prisma.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            success: true,
            user: {
                email: newUser.email,
            },
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: error.errors[0].message,
            });
        }
        next(error);
    }
}
