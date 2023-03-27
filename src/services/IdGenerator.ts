import { v4 } from "uuid"
import { GeneratorId } from "../model/GeneratorId"


export class IdGenerator implements GeneratorId {
    generateId (): string {
        return v4()
    }
}
