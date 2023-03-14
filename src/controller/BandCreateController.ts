import { Request,Response } from "express"
import { inputBandDTO } from "../model/BandCreateDTO"
import { BandCreateBusiness } from "../business/BandCreateBusiness"
import { inputGetBandDTO } from "../model/BandCreateDTO"




export class BandCreateController {
    constructor (private bandBusiness: BandCreateBusiness) {}

    async createBand (req: Request, res: Response): Promise<void> {
        try {
            const input: inputBandDTO = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible,
                token: req.headers.authorization as string
            }

            await this.bandBusiness.createBand(input)

            res.status(201).send("Band created successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async getBandInfo (req: Request, res: Response): Promise<void> {
        try {
            const input: inputGetBandDTO = {
                id: req.query.id as string,
                name: req.query.name as string,
                token: req.headers.authorization as string
            }

            const result = await this.bandBusiness.getBandInfo(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}
