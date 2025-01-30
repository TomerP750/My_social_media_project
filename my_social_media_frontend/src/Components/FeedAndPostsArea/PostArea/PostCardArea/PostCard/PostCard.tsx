import "./PostCard.css";
import {Post} from "../../../../../Models/Post.ts";
import {useEffect, useState} from "react";
import {CommentsOnPost} from "../../CommentsOnPost/CommentsOnPost.tsx";
import {PostActions} from "../PostActions/PostActions.tsx";
import {PostBottom} from "../PostBottom/PostBottom.tsx";
import {PostCenter} from "../PostCenter/PostCenter.tsx";
import {PostTop} from "../PostTop/PostTop.tsx";
import {getTokenState} from "../../../../../Util.ts";
import {useNavigate} from "react-router-dom";

interface PostProps {
    post: Post
    onDelete: (postId: number) => void;
    // onLikeToggle: (postId: number) => void;
}

export function PostCard(props: PostProps): JSX.Element {

    const [postCommentCount, setPostCommentCount] = useState<number>(0);
    const [openedComments, setOpenedComments] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleOpenComments() {
        if (getTokenState()) {
            setOpenedComments(!openedComments);
        } else {
            navigate("/login")
        }
    }

    return (

        <div className="postCard">
            <div className="postCardWrapper">
                <PostTop post={props.post} onDelete={props.onDelete}/>
                <PostCenter post={props.post}/>
                <PostBottom post={props.post} handleOpenComments={handleOpenComments}/>
                <PostActions post={props.post} handleOpenComments={handleOpenComments}/>
                {openedComments &&
                    <div className="commentSection">
                        {/*<AddComment post={props.post}/>*/}
                    <CommentsOnPost post={props.post}/>
                    </div>}
            </div>
        </div>
    );
}
