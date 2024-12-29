import { Request, Response } from "express"

export const getExampleData = (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello from the backend!", })
}
