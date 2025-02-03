import {User} from "./User.ts";


export class AboutBio {
    content: string
    id?: number
    user?: User

    constructor(content: string, id?: number, user?: User) {
        this.id = id;
        this.content = content;
        this.user = user;
    }
}