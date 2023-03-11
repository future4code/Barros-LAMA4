import { BandRegisterDataBase } from "../data/BandResisterDataBase";
import { CustomError } from "../error/BaseError";
import { BandUpdateDTO } from "../model/BandRegisterDTO";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

const authenticator = new Authenticator()
const hashManager = new HashManager()
const idGenerator = new IdGenerator()
export class BandRegisterBusiness {
    static createBand(create: { idBand: string; bandName: string; musicGenre: string; responsibleBand: string; roleAdm: import("../model/User").UserRole; }) {
        throw new Error("Method not implemented.");
    }
    createBand = async (input: BandUpdateDTO) => {
        try {
            const {id,name,music_genre,responsible,role} = input

            if (!name ||!music_genre ||!responsible ||!role) {
                throw new Error('name, music_genre, responsible, role is required');
        

    }
    const idRegisterBand = authenticator.generateToken(id)
    const idRegister = idGenerator.generate()
    await BandRegisterDataBase.create({
        id: idRegisterBand,
        name: name,
        music_genre: music_genre,
        responsible: responsible,
        role: role

    })
    } catch (error:any) {
        throw new CustomError(400,error.message);
    }
}
}
