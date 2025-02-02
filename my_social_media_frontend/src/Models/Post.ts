import {User} from "./User.ts";


export class Post {
    id: number
    datePosted: Date
    edited: boolean
    author: User
    content: string
    likeCount: number

    constructor(id: number, datePosted: Date, edited: boolean, author: User, content: string, likeCount: number,) {
        this.id = id
        this.datePosted = datePosted;
        this.edited = edited;
        this.author = author;
        this.content = content;
        this.likeCount = likeCount;
    }

}