import { BaseDatabase } from "./BaseDatabase";
import { BandCreateDTO } from "../model/BandCreateDTO";
import { CustomError } from "../error/BaseError";
import { BandRepository } from "../model/BandRepository";
export class BandCreateDatabase extends BaseDatabase implements BandRepository {
    private TABLE_NAME = "Bands_Name"
    
    async createBand (newBand: BandCreateDTO): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newBand)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getBandBy (column: string, value: string): Promise<BandCreateDTO | undefined> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(column, value)
            return result[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}