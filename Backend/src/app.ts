import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import { errorHandler } from "./middlewares/error-handler"
import { exampleApiRoute } from "./routes/example-api-route"

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)

// API routes
app.use("/api/example", exampleApiRoute)
export default app
