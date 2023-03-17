import { ShowDTO, outputGetAllShowDTO, UShowDatabaseDTO} from "./Show"


export interface ShowsRepository {
    createShow (newConcert: ShowDTO): Promise<void>
    searchShows (weekDay: string, column: string, value: string): Promise<any>
    getAllShows (weekDay: string): Promise<outputGetAllShowDTO[]>
    getShowsById (id: string): Promise<any>
    updateShow (newInfo: UShowDatabaseDTO): Promise<void>
    
}