import { ShowBusiness } from "../business/ShowBusiness"
import { Request, Response } from "express"
import { ICreateShowtDTO, IGetAllShowDTO, inputUShowDTO } from "../model/Show"


export class ShowController {
    constructor (private showBusiness: ShowBusiness) {}

    async createConcert (req: Request, res: Response): Promise<void> {
        try {
            const input: ICreateShowtDTO = {
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId,
                token: req.headers.authorization as string
            }

            await this.showBusiness.createShow(input)
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

            const result = await this.showBusiness.getAllShows(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
    async showConcert (req: Request, res: Response): Promise<void> {
        try {
            const input: inputUShowDTO = {
                id: req.params.id,
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                token: req.headers.authorization as string
            }

            await this.showBusiness.updateConcert(input)
            res.status(201).send("Show updated successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}