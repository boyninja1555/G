import { Router } from "express"
import { getPosts, getPost } from "../controllers/posts-controller"

export const postsRoute = Router()
postsRoute.get("/", getPosts)
postsRoute.get("/get/:id", getPost)
postsRoute.post("/post")
