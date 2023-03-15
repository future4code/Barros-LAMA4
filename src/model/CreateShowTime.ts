import { InvalidStartTime, EndTime } from "../error/ShowError"
import { CustomError } from "../error/BaseError"
import { ShowsDatabase } from "../data/ShowDataBase"
import { ShowsRepository } from "./ShowRepository"
import { ShowTimeDTO } from "./ShowTimeDTO"


export class CreateShowTime implements ShowTimeDTO {
    constructor (private showsDatabase: ShowsRepository) {}

    public startTimeFormat (startTime: string): void {
        try {
            const startTimeArray = startTime.split(":")
        
            if (startTimeArray.length < 3) {
                throw new InvalidStartTime()
            }
            if (Number(startTimeArray[0]) < 8 || Number(startTimeArray[0]) > 22) {
                throw new InvalidStartTime()
            }
            if (startTimeArray[1] !== "00" || startTimeArray[2] !== "00") {
                throw new InvalidStartTime()
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    public endTimeFormat (endTime: string): void {
        try {
            const endTimeArray = endTime.split(":")

            if (endTimeArray.length < 3) {
                throw new EndTime()
            }
            if (Number(endTimeArray[0]) < 9 || Number(endTimeArray[0]) > 23) {
                throw new EndTime()
            }
            if (endTimeArray[1] !== "00" || endTimeArray[2] !== "00") {
                throw new EndTime()
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

}