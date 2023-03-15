import { DuplicateConcert, InvalidConcertDuration, InvalidConcertTime, InvalidEndTime, InvalidStartTime } from "../error/ConcertErrors"
import { CustomError } from "../error/BaseError"

import { ShowsRepository } from "./ShowRepository"


export class CheckConcertTime implements ICheckConcertTime {
    constructor (private concertDatabase: ShowsRepository) {}

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