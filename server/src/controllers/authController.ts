// src/controllers/authController.ts
import type { Request, Response, NextFunction } from "express"
import { prisma } from "../index"
import { z } from "zod"
import { AppError } from "../utils/appError"
import { hashPassword, comparePasswords } from "../utils/password"

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (!user || !user.password) {
      throw new AppError("Invalid email or password", 401)
    }

    const isPasswordValid = await comparePasswords(validatedData.password, user.password)

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401)
    }

    res.status(200).json({
      success: true,
      user: {
        email: user.email,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      })
    }
    next(error)
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = registerSchema.parse(req.body)

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      throw new AppError("Email already in use", 409)
    }

    const hashedPassword = await hashPassword(validatedData.password)

    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
      },
    })

    res.status(201).json({
      success: true,
      user: {
        email: newUser.email,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      })
    }
    next(error)
  }
}
