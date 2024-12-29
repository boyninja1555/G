import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/error-handler"
import { postsRoute } from "./routes/posts"
import { userRoute } from "./routes/user"

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(errorHandler)

// API routes
app.use("/api/posts", postsRoute)
app.use("/api/user", userRoute)
export default app
