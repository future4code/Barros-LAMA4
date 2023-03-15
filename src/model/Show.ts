export class ShowDTO {
    constructor (
        public readonly id: string,
        public readonly week_day: string,
        public readonly start_time: string,
        public readonly end_time: string,
        public readonly band_id: string
    ) {
        this.id = id
        this.week_day = week_day
        this.start_time = start_time
        this.end_time = end_time
        this.band_id = band_id       
    }
}

export interface ICreateShowtDTO {
    weekDay: string,
    startTime: string,
    endTime: string,
    bandId: string,
    token: string
}

export interface IGetAllShowDTO {
    weekDay: string,
    token: string
}

export interface outputGetAllShowDTO {
    week_day: string,
    start_time: string,
    end_time: string,
    name: string,
    music_genre: string
}

