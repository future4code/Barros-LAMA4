import { UserRole } from "./User"

export interface BandRegisterDTO {
id: string,
name:string,
music_genre: string
responsible: string,
role: UserRole.ADMIN

};


export interface BandUpdateDTO {
   id:any,
    name: string,
    music_genre:string,
    responsible: string,
    role: UserRole.ADMIN
}