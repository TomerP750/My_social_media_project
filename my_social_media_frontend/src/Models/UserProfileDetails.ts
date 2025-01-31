import {User} from "./User.ts";


export class UserProfileDetails {
    id: number
    user: User
    about: string
    banner: string

    constructor(id:number, user:User, about:string, banner:string) {
        this.id = id;
        this.user = user;
        this.about = about;
        this.banner = banner
    }
}