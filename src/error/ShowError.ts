import { CustomError } from "./BaseError";

export class ShowId extends CustomError {
    constructor () {
        super (422, "Provide the show id.")
    }
}

export class ShowtId extends CustomError {
    constructor () {
        super (404, "Show id not found.")
    }
}

export class WeekDay extends CustomError {
    constructor () {
        super (422, "Provide the week day.")
    }
}

export class InvalidWeekDay extends CustomError {
    constructor () {
        super (422, "The week day can only be  friday, saturday or sunday.")
    }
}

export class StartTime extends CustomError {
    constructor () {
        super (422, "Provide the start time.")
    }
}

export class InvalidStartTime extends CustomError {
    constructor () {
        super (422, "The start time must be between 8:00 am and 11:00 pm.")
    }
}

export class EndTime extends CustomError {
    constructor () {
        super (422, "Provide the end time.")
    }
}
export class InvalidShowTime extends CustomError {
    constructor () {
        super (422, "Has to be in the max 1hr.")
    }
}

export class NoShows extends CustomError {
    constructor (){
        super (422, "No Shows")
    }
}



export class DuplicateConcert extends CustomError {
    constructor () {
        super (422, "There is a Show already registered .")
    }
}


