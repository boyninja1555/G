import { Request, Response } from "express"
import { User } from "../types/interfaces"
import { tableExists, readTable, writeTable, deleteTable } from "../utils/database-manager"
import { verifyToken } from "../utils/token-manager"

export const getPublicUser = (req: Request, res: Response) => {
    const { handle } = req.params

    if (!tableExists(`users/${handle}`, "json")) {
        res.status(404).json({ message: "User not found", })
        return
    }

    let user: User = readTable(`users/${handle}`, "json")

    if (!user) {
        res.status(500).json({ message: "Internal Server Error", })
        return
    }

    if (user.password) user.password = undefined as any
    res.status(200).json(user)
}

export const getUser = (req: Request, res: Response) => {
    const { token } = req.cookies
    const verifiedUser = verifyToken(token)

    if (!verifiedUser) {
        res.status(401).json({ message: "Unauthorized", })
        return
    }

    res.status(200).json(verifiedUser)
}

export const createUser = (req: Request, res: Response) => {
    const { password = null, name = { first: null, last: null, }, handle = null, emails = [], description = null, pronouns = [] } = req.body
    const user: User = { password, name, emails, description, pronouns, }

    if (!tableExists(`users/${handle}`, "json")) {
        writeTable(`users/${handle}`, "json", user)
    } else {
        res.status(409).json({ message: "User already exists", })
        return
    }

    res.status(201).json({ message: "User successfully created", response: user, })
}

export const deleteUser = (req: Request, res: Response) => {
    const { token } = req.cookies
    const verifiedUser = verifyToken(token)

    if (!verifiedUser) {
        res.status(401).json({ message: "Unauthorized", })
        return
    }

    deleteTable(`users/${verifiedUser.name.handle}`, "json")
}
