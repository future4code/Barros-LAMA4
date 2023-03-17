
import  { ICreateShowtDTO, ShowDTO, outputGetAllShowDTO, IGetAllShowDTO, UShowDatabaseDTO, inputUShowDTO} from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { IdAuthenticator } from "../model/IdAuthenticator";
import { CustomError } from "../error/BaseError";
import { MissingToken } from "../error/BaseError";
import { IdNotFound, BandId } from "../error/BandErrors";
import { GeneratorId } from "../model/GeneratorId";
import { ShowsRepository } from "../model/ShowRepository";
import { BandRepository } from "../model/BandRepository";
import { UserRole } from "../model/User";
import { WeekDay, StartTime, EndTime, InvalidWeekDay, NoShows, ShowtId  } from "../error/ShowError";
import { Unauthorized } from "../error/BaseError";
import { CreateShowTime } from "../model/CreateShowTime";


export class ShowBusiness {
    constructor (
        private showDatabase: ShowsRepository,
        private bandDatabase: BandRepository,
        private authorization: IdAuthenticator,
        private idGenerator: GeneratorId,
        private checkUp: CreateShowTime
    ) {}

    async createShow (input: ICreateShowtDTO): Promise<void> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.bandId) {
                throw new BandId()
            }
            if (!input.weekDay) {
                throw new WeekDay()
            }
            if (!input.startTime) {
                throw new StartTime()
            }
            if (!input.endTime) {
                throw new EndTime()
            }
            if (input.weekDay.toLowerCase() !== "friday" && input.weekDay.toLowerCase() !== "saturday" && input.weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }

            const {id, role} = await this.authorization.getTokenData(input.token)
            if (role.toUpperCase() !== UserRole.ADMIN) {
                throw new Unauthorized()
            }

            const bandIdExists = await this.bandDatabase.getBandBy("id", input.bandId)
            if (!bandIdExists) {
                throw new IdNotFound()
            }

            await this.checkUp.startTimeFormat(input.startTime)
            await this.checkUp.endTimeFormat(input.endTime)
            await this.checkUp.showTimeCheck(input.startTime, input.endTime)
            
            const showId = this.idGenerator.generateId()
            const newShow = new ShowDTO(showId, input.weekDay, input.startTime, input.endTime, input.bandId)
            await this.showDatabase.createShow(newShow)

        
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllShows (input: IGetAllShowDTO): Promise<outputGetAllShowDTO[]> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.weekDay) {
                throw new WeekDay()
            }
            if (input.weekDay.toLowerCase() !== "friday" && input.weekDay.toLowerCase() !== "saturday" && input.weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }
           
            await this.authorization.getTokenData(input.token)

            const result = await this.showDatabase.getAllShows(input.weekDay)
            if (result.length === 0) {
                throw new NoShows()
            }

            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    } 
    async updateConcert (input: inputUShowDTO): Promise<void> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (input.id === ":id") {
                throw new ShowtId()
            }
            if (input.weekDay && input.weekDay.toLowerCase() !== "friday" && input.weekDay.toLowerCase() !== "saturday" && input.weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }
            
            const {id, role} = await this.authorization.getTokenData(input.token)
            if (role.toUpperCase() !== UserRole.ADMIN) {
                throw new Unauthorized()
            }

            const getShow = await this.showDatabase.getShowsById(input.id)
            if (!getShow) {
                throw new ShowtId()
            }

            if (!input.weekDay) {
                input.weekDay = getShow.week_day
            }
            if (!input.startTime) {
                input.startTime = getShow.start_time
            }
            if (!input.endTime) {
                input.endTime = getShow.end_time
            }

            await this.checkUp.startTimeFormat(input.startTime)
            await this.checkUp.endTimeFormat(input.endTime)
            await this.checkUp.showTimeCheck(input.startTime, input.endTime)
            
            
            const newTime: UShowDatabaseDTO = {
                id: input.id,
                weekDay: input.weekDay,
                startTime: input.startTime,
                endTime: input.endTime
            }

            await this.showDatabase.updateShow(newTime)
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}