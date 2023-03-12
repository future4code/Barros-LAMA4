import { CustomError } from "../error/BaseError"
import { User } from "../model/User"
import { UserRepository } from "../model/UserRepository"
import { BaseDatabase } from "./BaseDatabase"


export class UserDatabase extends BaseDatabase implements UserRepository {
  private TABLE_NAME = "Lama_Users"
  
  async signup (newUser: User): Promise<void> {
      try {
          await BaseDatabase.connection(this.TABLE_NAME).insert(newUser)
      } catch (error: any) {
          throw new CustomError(error.statusCode, error.message)
      }
  }

  async getUser (column: string, value: string): Promise<User | undefined> {
      try {
          const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(column, value)
          return result[0]
      } catch (error: any) {
          throw new CustomError(error.statusCode, error.message)
      }
  }
}