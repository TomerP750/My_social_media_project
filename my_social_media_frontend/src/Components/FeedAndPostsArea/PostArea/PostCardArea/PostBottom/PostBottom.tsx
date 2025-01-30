import "./PostBottom.css";

import GradeIcon from "@mui/icons-material/Grade";
import {useEffect, useState} from "react";
import feedService from "../../../../../Services/FeedService.ts";
import {Post} from "../../../../../Models/Post.ts";


interface PostBottomProps {
    post: Post
    isLiked: boolean
    handleOpenComments: () => void
    numOfLikes: number
}
export function PostBottom(props: PostBottomProps): JSX.Element {

    const [postCommentCount, setPostCommentCount] = useState<number>(0);


    useEffect(() => {
        feedService.getCommentCountByPostId(props.post.id)
            .then(res=>setPostCommentCount(res))
            .catch(err=>err.message.data)
    }, []);


    return (
    <div className="postBottom">
        <div className="postBottomLeft">
            <span className={"likeCounterText"}>{props.numOfLikes}</span>
            <GradeIcon className={`star-icon ${props.isLiked ? 'active' : ''}`}/>
        </div>
        <div className="postBottomRight">
            <span className={"postCommentText"} onClick={props.handleOpenComments}>{postCommentCount} Comments</span>
        </div>
    </div>
    )
}
