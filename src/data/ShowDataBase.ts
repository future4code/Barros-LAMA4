import { CustomError } from "../error/BaseError"
import { ShowDTO,outputGetAllShowDTO,UShowDatabaseDTO } from "../model/Show"

import { ShowsRepository } from "../model/ShowRepository"
import { BaseDatabase } from "./BaseDatabase"

export class ShowsDatabase extends BaseDatabase implements ShowsRepository {
    private TABLE_NAME = "Table_Shows"
    
    async createShow (newShow: ShowDTO): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newShow)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    
    async searchShows (weekDay: string, column: string, value: string): Promise<any> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
            .select()
            .where("week_day", weekDay)
            .andWhere(column, value)

            return result[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllShows (weekDay: string): Promise<outputGetAllShowDTO[]> {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME)
            .join("Bands_Name", "Table_Shows.band_id", "=", "Bands_Name.id")
            .select("Table_Shows.week_day", "Table_Shows.start_time", "Table_Shows.end_time", "Bands_Name.name", "Bands_Name.music_genre")
            .where("week_day", weekDay).orderBy("start_time")
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getShowsById (id: string): Promise<any> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where("id", id)
            return result[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async updateShow (newInfo: UShowDatabaseDTO): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update({week_day: newInfo.weekDay, start_time: newInfo.startTime, end_time: newInfo.endTime})
            .where("id", newInfo.id)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
