import "./PostBottom.css";

import GradeIcon from "@mui/icons-material/Grade";
import {useEffect, useState} from "react";
import {getTokenState} from "../../../../../Util.ts";
import {useNavigate} from "react-router-dom";
import feedService from "../../../../../Services/FeedService.ts";
import {Post} from "../../../../../Models/Post.ts";
import {CommentsOnPost} from "../../CommentsOnPost/CommentsOnPost.tsx";


interface PostBottomProps {
    post: Post
    handleOpenComments: () => void
}
export function PostBottom(props: PostBottomProps): JSX.Element {


    let [numOfLikes, setNumOfLikes] = useState<number>(props.post.likeCount);
    const [postCommentCount, setPostCommentCount] = useState<number>(0);
    const [openedComments, setOpenedComments] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const navigate = useNavigate();


    useEffect(() => {
        feedService.getCommentCountByPostId(props.post.id)
            .then(res=>setPostCommentCount(res))
            .catch(err=>err.message.data)
    }, []);


    return (
    <div className="postBottom">
        <div className="postBottomLeft">
            <span className={"likeCounterText"}>{numOfLikes}</span>
            <GradeIcon className={`star-icon ${isLiked ? 'active' : ''}`}/>
        </div>
        <div className="postBottomRight">
            <span className={"postCommentText"} onClick={props.handleOpenComments}>{postCommentCount} Comments</span>
        </div>
    </div>
    )
}
