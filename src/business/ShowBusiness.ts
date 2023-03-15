import { ShowDataBase } from "../data/ShowDataBase";
import { ICreateShowInputDTO, ICreateShowOutputDTO, Show } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { CustomError } from "../error/BaseError";

export class ShowBusiness {

    public createShow = async (input: ICreateShowInputDTO): Promise<ICreateShowOutputDTO> => {
        const showDataBase = new ShowDataBase
        const authenticator = new Authenticator
        const idGenerator = new IdGenerator


        try {
            const { token, band, startsAt } = input

        const payload = authenticator.getTokenData(token)

        const startsAtDate = new Date(startsAt)
        

        const show = new Show(
            idGenerator.generateId(),
            band,
            startsAtDate
        )

        await showDataBase.createShow(show)

        const response: ICreateShowOutputDTO = {
            message: "Show criado com sucesso",
            show
        }

        return response

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}