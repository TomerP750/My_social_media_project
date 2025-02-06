import {User} from "./User.ts";

export class Notification {
    id: number
    content: string
    dateNotified: Date
    user: User

    constructor(id: number, content: string, dateNotified: Date , user: User) {
        this.id = id;
        this.content = content;
        this.dateNotified = dateNotified;
        this.user = user;
    }
}