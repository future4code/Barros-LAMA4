import { BandCreateDTO } from "./BandCreateDTO";

export interface BandRepository {
    createBand (newBand: BandCreateDTO): Promise<void>
    getBandBy (column: string, value: string): Promise<BandCreateDTO | undefined>
}