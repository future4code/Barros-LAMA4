import { BaseDatabase } from "./BaseDatabase";
import { BandRegisterDTO } from "../model/BandRegisterDTO";
import { CustomError } from "../error/BaseError";
export class BandRegisterDataBase extends BaseDatabase {
    private static TABLE_NAME : string = "Bands_Name"

    create = async ({id, name, music_genre,responsible,role }: BandRegisterDTO) => {
        try{
            await BandRegisterDataBase.connection.insert ({
                id,
                name,
                music_genre,
                responsible,
                role

            }).into(BandRegisterDataBase.TABLE_NAME)
        } catch (error:any) {
            throw new CustomError(400, onmessage || error.sqlMessage)
        }

    }
    static create: any;
}