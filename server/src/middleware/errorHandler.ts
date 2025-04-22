import type { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/appError"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  // Handle Prisma errors
  if (err.name === "PrismaClientKnownRequestError") {
    return res.status(400).json({
      success: false,
      message: "Database error occurred",
    })
  }

  // Default error response
  res.status(500).json({
    success: false,
    message: "Internal server error",
  })
}
