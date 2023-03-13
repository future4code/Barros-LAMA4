import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { CustomError, InvalidEmail, InvalidName, InvalidPassword, SmallEmail, UserNotFound } from "../error/BaseError";

export class UserBusiness {

    async createUser(user: UserInputDTO) {

        try {

            if(!user.email){
                throw new InvalidEmail
            }

            const filterEmail = user.email.includes("@" && ".com")
            if(filterEmail != true){
                throw new InvalidEmail
            }

            if(!user.name){
                throw new InvalidName
            }

            if(user.email.length < 10){
                throw new SmallEmail
            }

            if(user.name.length < 4){
                throw new InvalidName
            }

            if(!user.password){
                throw new InvalidPassword
            }

            if(user.password.length < 6){
                throw new InvalidPassword
            }   

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(user.password);

            const userDatabase = new UserDatabase();
            await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id, role: user.role });

            return accessToken;

        } catch (error:any) {
            throw new CustomError(error.status, error.message)
        }
    }

    async getUserByEmail(user: LoginInputDTO) {

        try {

            if(!user.email){
                throw new UserNotFound
            }

            if(!user.password){
                throw new InvalidPassword
            }

            const userDatabase = new UserDatabase();
            const userFromDB = await userDatabase.getUserByEmail(user.email);

            const hashManager = new HashManager();
            const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

            if (!hashCompare) {
                throw new Error("Invalid Password!");
            }

            return accessToken;

        } catch (error:any) {
            throw new CustomError(error.status, error.message)
        }
    }
}