import { CustomError } from "./BaseError"


export class BandName extends CustomError {
    constructor () {
        super (422, "Provide the band name.")
    }
}

export class DuplicateBandName extends CustomError {
    constructor () {
        super (409, "Band name already registered.")
    }
}

export class MusicGenre extends CustomError {
    constructor () {
        super (422, "Provide the music genre.")
    }
}

export class Responsible extends CustomError {
    constructor () {
        super (422, "Provide the name of the responsible for the band.")
    }
}
export class NameOrId extends CustomError {
    constructor () {
        super (422, "Provide the id or the name of the band.")
    }
}

export class IdNotFound extends CustomError {
    constructor () {
        super (404, "Band id not found.")
    }
}

export class NameNotFound extends CustomError {
    constructor () {
        super (404, "Band name not found.")
    }
}

export class InvalidInfo extends CustomError {
    constructor () {
        super (422, "Provide either the band id or the band name.")
    }
}


export { CustomError }
