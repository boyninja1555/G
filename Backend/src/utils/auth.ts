import { Request, Response } from "express"
import { createToken } from "./token-manager"

export function login(req: Request, res: Response) {
    const { handle, password } = req.body
    const token = createToken(handle, password)
    req.cookies.token = token
    res.status(200).json({ token, })
}

export function logout(req: Request, res: Response) {
    res.clearCookie("token")
    res.status(200).json({ message: "Logged out successfully", })
}
