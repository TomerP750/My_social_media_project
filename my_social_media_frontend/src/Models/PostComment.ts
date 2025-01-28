import {Post} from "./Post.ts";
import {User} from "./User.ts";


export class PostComment {
    id: number
    post: Post
    dateCommented: Date
    commentAuthor: User
    message:string

    constructor(id: number, post: Post, dateCommented: Date, commentAuthor: User, message:string) {
        this.id = id
        this.post = post;
        this.dateCommented = dateCommented;
        this.commentAuthor = commentAuthor;
        this.message = message;
    }
}