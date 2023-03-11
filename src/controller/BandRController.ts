import { Request,Response } from "express"
import { UserRole } from "../model/User"
import { BandRegisterBusiness } from "../business/BandRegisterBusiness"

const bandRegisterBusiness = new BandRegisterBusiness

export class BandRController {
   
    createBand = async (req:Request,res:Response) =>{
        try {
          const  id =  req.headers.authorization as any
          const  name = req.body.name as string
         const   music_genre = req.body.music_genre as string
          const  responsible = req.body.responsible as string
          const  role = req.body.role as UserRole.ADMIN

          const create = {
            id: id,
            name: name,
            music_genre: music_genre,
            responsible: responsible,
            role: role
          }
          await bandRegisterBusiness.createBand(create)
res.status(201).send({message: "New Band on tour"})
        } catch (error:any){
            res.status(400).send(error.message)
        }
        
        
    }
}