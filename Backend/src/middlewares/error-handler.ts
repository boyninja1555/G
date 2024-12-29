import { Request, Response, NextFunction } from "express"
import { logError } from "../utils/logger"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logError(err)
    res.status(500).json({ message: "Internal Server Error", })
}
