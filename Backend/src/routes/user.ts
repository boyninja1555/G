import { Router } from "express"
import { getPublicUser, getUser, createUser } from "../controllers/user-controller"
import { login, logout } from "../utils/auth"

export const userRoute = Router()
userRoute.get("/", getUser)
userRoute.get("/public/:handle", getPublicUser)
userRoute.get("/logout", logout)
userRoute.post("/create", createUser)
userRoute.post("/login", login)
