import { Request, Response } from "express";
import { ICreateShowInputDTO } from "../model/Show";
import { ShowBusiness } from "../business/ShowBusiness";

export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) {}

    public createShow = async (req: Request, res: Response) => {
        
        try {
            const input: ICreateShowInputDTO = {
                token: req.body.authorization,
                band: req.body.band,
                startsAt: req.body.startsAt
            }

            const response = await this.showBusiness.createShow(input)
            res.status(201).send(response)
        } catch (error: any) {
            res.status(error.statusCode).send({ message: error.message })
        }
    }
}