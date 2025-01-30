import "./PostCenter.css";
import {Post} from "../../../../../Models/Post.ts";


interface PostCenterProps {
    post: Post
}
export function PostCenter(props: PostCenterProps): JSX.Element {
    return (
        <div className="postCenter">
            <span className={"postText"}>{props.post.content}</span>
        </div>
    );
}
