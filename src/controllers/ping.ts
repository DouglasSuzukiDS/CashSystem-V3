import { Request, Response } from "express"

export const ping = (req: Request, res: Response) => {
   res.status(200).send({ msg: "pong" })
}

export const PrivatePing = (req: Request, res: Response) => {
   res.status(200).send({ msg: "Private Pong" })
}