import { ShowDTO, updateShowDatabaseDTO, outputGetAllShowDTO } from "./Show"


export interface ShowsRepository {
    createShow (newConcert: ShowDTO): Promise<void>
    searchShows (weekDay: string, column: string, value: string): Promise<any>
    getAllShows (weekDay: string): Promise<outputGetAllShowDTO[]>
    getShowsById (id: string): Promise<any>
    updateShows (newInfo: updateShowDatabaseDTO): Promise<void>
}