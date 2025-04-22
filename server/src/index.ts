import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import authRoutes from "./routes/authRoutes"
import { errorHandler } from "./middleware/errorHandler"

const app = express()
const port = process.env.PORT || 3001
export const prisma = new PrismaClient()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)

// Error handling middleware
app.use(errorHandler)

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully")
  await prisma.$disconnect()
  server.close(() => {
    console.log("Server closed")
    process.exit(0)
  })
})

export default app
