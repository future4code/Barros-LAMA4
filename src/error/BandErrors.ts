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

export { CustomError }
