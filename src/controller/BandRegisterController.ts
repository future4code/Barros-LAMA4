import { Request,Response, request } from "express"
import { UserRole } from "../model/User"
import { BandRegisterBusiness } from "../business/BandRegisterBusiness"
export class BandRegisterController {
    createBandRegister = async (req: Request, res: Response) =>{
        try{
            const idBand = req.headers.authorization as string
            const bandName = req.body.name as string
            const musicGenre = req.body.music_genre as string
            const responsibleBand = req.body.responsible as string
            const roleAdm = req.body.role as UserRole

            const create = {
                idBand: idBand,
                bandName: bandName,
                musicGenre: musicGenre,
                responsibleBand: responsibleBand,
                roleAdm: roleAdm
            }
            await BandRegisterBusiness.createBand(create)
            res.status(201).send({
                message: "Band Register created successfully"
            })

        } catch (error:any) {
            res.status(400).send(error.message);
    }

    
}
}