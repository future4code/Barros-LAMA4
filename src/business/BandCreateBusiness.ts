import { NameOrId,NameNotFound,IdNotFound,InvalidInfo, } from "../error/BandErrors"
import { DuplicateBandName, BandName, MusicGenre, Responsible } from "../error/BandErrors"
import { CustomError } from "../error/BaseError"
import { MissingToken, Unauthorized } from "../error/BaseError"
import { BandCreateDTO, inputBandDTO, inputGetBandDTO } from '../model/BandCreateDTO';
import { BandRepository } from "../model/BandRepository"
import { IdAuthenticator } from "../model/IdAuthenticator"
import { GeneratorId } from "../model/GeneratorId"
import { UserRole } from "../model/User"

export class BandCreateBusiness {
    constructor (
        private bandDatabase: BandRepository,
        private authorization: IdAuthenticator,
        private idGenerator: GeneratorId
    ) {}

    async createBand (input: inputBandDTO): Promise<void> {
        try {
            if (!input.name) {
                throw new BandName()
            }
            if (!input.musicGenre) {
                throw new MusicGenre()
            }
            if (!input.responsible) {
                throw new Responsible()
            }
            if (!input.token) {
                throw new MissingToken()
            }

            const duplicateName = await this.bandDatabase.getBandBy("name", input.name)
            if (duplicateName) {
                throw new DuplicateBandName()
            }

            const {id, role} = this.authorization.getTokenData(input.token)
            if (role.toUpperCase() !== UserRole.ADMIN) {
                throw new Unauthorized()
            }

            const bandId = this.idGenerator.generateId()
            const newBand = new BandCreateDTO(bandId, input.name, input.musicGenre, input.responsible)
            
            await this.bandDatabase.createBand(newBand)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getBandInfo (input: inputGetBandDTO): Promise<BandCreateDTO> {
        try {
            if (!input.token) {
                throw new MissingToken()                
            }
            if (!input.id && !input.name) {
                throw new NameOrId()
            }

            await this.authorization.getTokenData(input.token)

            if (input.id && input.name) {
                throw new InvalidInfo()
            }
        
            let result : any
            if (input.id) {
                const idExists = await this.bandDatabase.getBandBy("id", input.id)
                if (!idExists) {
                    throw new IdNotFound()
                }
                result = idExists
            }

            if (input.name) {
                input.name = input.name.replace("_", " ")
                
                const nameExists = await this.bandDatabase.getBandBy("name", input.name)
                if (!nameExists) {
                    throw new NameNotFound()
                }
                
                result = nameExists
            }

            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}