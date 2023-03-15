import { ShowDataBase } from "../data/ShowDataBase";
import { ICreateShowInputDTO, ICreateShowOutputDTO, ICreateShowtDTO, ShowDTO } from "../model/Show";
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
import { WeekDay, StartTime, EndTime, InvalidWeekDay } from "../error/ShowError";
import { Unauthorized } from "../error/BaseError";


export class ShowBusiness {
    constructor(
        private ShowDataBase : ShowsRepository,
        private bandDataBase : BandRepository,
        private generateId : GeneratorId,
        private auth : IdAuthenticator,
        private ShowTime : ICreateShowtDTO
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
            if (input.weekDay.toLowerCase() !== "sexta" && input.weekDay.toLowerCase() !== "sábado" && input.weekDay.toLowerCase() !== "domingo") {
                throw new InvalidWeekDay()
            }

            const {id, role} = await this.auth.getTokenData(input.token)
            if (role.toUpperCase() !== UserRole.ADMIN) {
                throw new Unauthorized()
            }

            const bandIdExists = await this.bandDataBase.getBandBy("id", input.bandId)
            if (!bandIdExists) {
                throw new IdNotFound()
            }
           
        }