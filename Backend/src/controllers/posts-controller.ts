import { Request, Response } from "express"
import { Post } from "../types/interfaces"
import { readTableGroup, readTable, writeTable, tableExists } from "../utils/database-manager"

export const getPosts = (req: Request, res: Response) => {
    const posts: Post[] = []
    const postsList: string[] = readTableGroup("posts")

    postsList.forEach((postName: string) => {
        const post: Post = readTable(`posts/${postName}`, "json") as Post
        posts.push(post)
    })
    res.status(200).json(posts)
}

export const getPost = (req: Request, res: Response) => {
    const { id } = req.params
    const { limitBody, hideComments } = req.query

    if (!id) {
        res.status(400).json({ message: "Missing post ID." })
        return
    }

    if (!readTable(`posts/${id}`, "json")) {
        res.status(404).json({ message: "Post not found." })
        return
    }

    const post: Post = readTable(`posts/${id}`, "json") as Post
    if (limitBody) post.body = post.body.slice(0, Number(limitBody)) + "..."
    if (hideComments) post.comments = undefined as any
    res.status(200).json(post)
}

export const post = (req: Request, res: Response) => {
    const newPost: Post = req.body

    if (!newPost.name || !newPost.body || !newPost.poster) {
        res.status(400).json({ message: "Missing required fields: name, body, poster." })
        return
    }

    const allowedChars = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "-",
    ]
    let postNameParsed = newPost.name.toLowerCase().trim().replace(/ /g, "-")
    postNameParsed = postNameParsed.split("").filter(char => allowedChars.includes(char)).join("")

    const postId = `${newPost.poster}_${postNameParsed}`
    
    if (tableExists(postId, "json")) {
        res.status(409).json({ message: "Post with the same name on your account already exists." })
        return
    }

    writeTable(`posts/${postId}`, "json", newPost)
    res.status(201).json({ message: "Post created successfully.", id: postId })
}
