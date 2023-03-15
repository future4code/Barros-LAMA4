import { ShowBusiness } from "../business/ShowBusiness"
import { Request, Response } from "express"
import { ICreateShowtDTO, IGetAllShowDTO } from "../model/Show"


export class ShowController {
    constructor (private concertBusiness: ShowBusiness) {}

    async createConcert (req: Request, res: Response): Promise<void> {
        try {
            const input: ICreateShowtDTO = {
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId,
                token: req.headers.authorization as string
            }

            await this.concertBusiness.createShow(input)
            res.status(201).send("Show created successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async getAllShows (req: Request, res: Response): Promise<void> {
        try {
            const input:IGetAllShowDTO= {
                weekDay: req.query.weekDay as string,
                token: req.headers.authorization as string
            }

            const result = await this.concertBusiness.getAllShows(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}