import { BaseDatabase } from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase {
    public static TABLE_NAME = "Table_Shows"

    
    public toShowDBModel = (show: any) => {
        const showDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt()
        }

        return showDB
    }

    public findShowByDate = async (date: Date): Promise<any> => {
        const result = await BaseDatabase
            .connection(ShowDataBase.TABLE_NAME)
            .select()
            .where({ starts_at: date })

        return result[0]
    }

    public createShow = async (show: any): Promise<void> => {
        const showDB = this.toShowDBModel(show)

        await BaseDatabase
            .connection(ShowDataBase.TABLE_NAME)
            .insert(showDB)
    } 
}