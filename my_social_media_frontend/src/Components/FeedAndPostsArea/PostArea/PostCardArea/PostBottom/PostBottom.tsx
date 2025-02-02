import "./PostBottom.css";

import GradeIcon from "@mui/icons-material/Grade";
import {Post} from "../../../../../Models/Post.ts";


interface PostBottomProps {
    post: Post
    isLiked: boolean
    handleOpenComments: () => void
    numOfLikes: number
    postCommentCount: number
    setPostCommentCount: React.Dispatch<React.SetStateAction<number>>;
}
export function PostBottom(props: PostBottomProps): JSX.Element {

    return (
    <div className="postBottom">
        <div className="postBottomLeft">
            <span className={"likeCounterText"}>{props.numOfLikes}</span>
            <GradeIcon className={`star-icon ${props.isLiked ? 'active' : ''}`}/>
        </div>
        <div className="postBottomRight">
            <span className={"postCommentText"} onClick={props.handleOpenComments}>{props.postCommentCount} Comments</span>
        </div>
    </div>
    )
}
