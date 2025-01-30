import "./PostActions.css";
import {Post} from "../../../../../Models/Post.ts";
import userService from "../../../../../Services/UserService.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface PostActionsProps {
    post: Post
    handleOpenComments: () => void
    onLikePost: (isLiked: boolean) => void;
    isLiked: boolean
    numOfLikes: number
}
export function PostActions(props: PostActionsProps): JSX.Element {


    const navigate = useNavigate();

    function handleLike() {
        userService.likeUnlike(props.post)
            .then(res=> {
                userService.checkIfPostLiked(props.post.id)
                    .then(liked => props.onLikePost(liked))
                    .catch(err=> err.response.data)
            })
            .catch(err=>{
                navigate("/login")
            })
    }



    return (
        // <div className="postActions">
        //     <span className={"likePost"} onClick={handleStarClick}>Star</span>
        //     <span className={"commentPost"} onClick={props.handleOpenComments}>Comment</span>
        //     <span className={"sharePost"}>Share</span>
        // </div>
        <div className="postActions">
            <span
                className={`likePost ${props.isLiked ? 'liked' : ''}`}
                onClick={handleLike}
            >
                Star
            </span>
            <span className="commentPost" onClick={props.handleOpenComments}>
                Comment
            </span>
            <span className="sharePost">Share</span>
        </div>
    );
}
