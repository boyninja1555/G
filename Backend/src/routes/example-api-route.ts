import { Router } from "express"
import { getExampleData } from "../controllers/example-api-route-controller"

export const exampleApiRoute = Router()
exampleApiRoute.get("/", getExampleData)
