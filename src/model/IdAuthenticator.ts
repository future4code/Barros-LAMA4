import { AuthenticationData } from "./AuthenticatorData"


export interface IdAuthenticator {
    generateToken ({id, role}: AuthenticationData): string
    getTokenData (token: string): AuthenticationData
}