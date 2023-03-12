import { CustomError } from "../error/BaseError"
import { DuplicateEmail, EmailNotFound, IncorrectPassword, InvalidEmail, InvalidPassword, MissingEmail, MissingPassword, MissingUserName, MissingUserRole } from "../error/UserErros"
import { IdAuthenticator } from "../model/IdAuthenticator"
import { HashGenarator } from "../model/HashGenerator"
import { UidGenarator } from "../model/UidGenarator"
import { inputSignUpDTO, loginInputDTO, User, UserRole } from "../model/User"
import { UserRepository } from "../model/UserRepository"


export class UserBusiness {
    constructor (
        private userDatabase : UserRepository,
        private idGenerator: UidGenarator,
        private hashManager: HashGenarator,
        private authenticator: IdAuthenticator
    ) {}

    async signup (input: inputSignUpDTO): Promise<string> {
        try {
            if (!input.name) {
                throw new MissingUserName()
            }
            if (!input.email) {
                throw new MissingEmail()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
            if (!input.role) {
                throw new MissingUserRole()
            }
            if (input.password.length < 8) {
                throw new InvalidPassword()
            }
            if (!input.email.includes("@")) {
                throw new InvalidEmail()
            }

            const isEmailDuplicate = await this.userDatabase.getUser("email", input.email)
            if (isEmailDuplicate) {
                throw new DuplicateEmail()
            }
    
            let role
            input.role.toUpperCase() === UserRole.ADMIN ? role = UserRole.ADMIN : role = UserRole.NORMAL
            
            const id = this.idGenerator.generateId()
            const hashPassword = await this.hashManager.generateHash(input.password)

            const newUser = new User(id, input.name, input.email, hashPassword, role)
            await this.userDatabase.signup(newUser)
            
            return this.authenticator.generateToken({id, role})

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async login (input: loginInputDTO): Promise<string> {
        try {
            if (!input.email) {
                throw new MissingEmail()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
            if (!input.email.includes("@")) {
                throw new InvalidEmail()
            }

            const emailExists = await this.userDatabase.getUser("email", input.email)
            if (!emailExists) {
                throw new EmailNotFound()
            }

            const compareHash = await this.hashManager.compareHash(input.password, emailExists.password)
            if (!compareHash) {
                throw new IncorrectPassword()
            }

            const token = this.authenticator.generateToken({ id: emailExists.id, role: emailExists.role})
            return token

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}