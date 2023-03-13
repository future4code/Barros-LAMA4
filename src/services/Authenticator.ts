import dotenv from "dotenv"
import * as jwt from "jsonwebtoken"
import { Unauthorized } from "../error/BaseError"
import { AuthenticationData } from "../model/AuthenticatorData"
import { IdAuthenticator } from "../model/IdAuthenticator"



dotenv.config()

export class Authenticator implements IdAuthenticator {
    public generateToken = ({id, role}: AuthenticationData): string => {
        const token = jwt.sign(
            {id, role},
            process.env.JWT_KEY as string,
            {expiresIn: "1h"}
        )

        return token
    }

    public getTokenData = (token: string): AuthenticationData => {
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
            return {id: payload.id, role: payload.role}
        } catch (err: any) {
            throw new Unauthorized()
        }
    }
}