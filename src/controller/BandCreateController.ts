import { Request,Response } from "express"
import { inputCreateBandDTO } from "../model/BandCreateDTO"
import { BandCreateBusiness } from "../business/BandCreateBusiness"

export class BandCreateController {
  constructor (private bandBusiness: BandCreateBusiness) {}

  async createBand (req: Request, res: Response): Promise<void> {
      try {
          const input: inputCreateBandDTO = {
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
}
