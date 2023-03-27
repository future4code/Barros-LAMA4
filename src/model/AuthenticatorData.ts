import { UserRole } from "./User"

export interface AuthenticationData {
    id: string,
    role: UserRole
}