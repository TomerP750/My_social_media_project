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
import {User} from "../../../../../Models/User.ts";
import userService from "../../../../../Services/UserService.ts";
import feedService from "../../../../../Services/FeedService.ts";

interface PostProps {
    user: User
    post: Post
    onDelete: (postId: number) => void;
    onEdit: (updatedPost: Post) => void;
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;

}

export function PostCard(props: PostProps): JSX.Element {

    const [numOfLikes, setNumOfLikes] = useState<number>(props.post.likeCount);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [openedComments, setOpenedComments] = useState<boolean>(false);
    const navigate = useNavigate();
    const [postCommentCount, setPostCommentCount] = useState<number>(0);


    useEffect(() => {
        userService.checkIfPostLiked(props.post.id)
            .then(res => setIsLiked(res))
            .catch(err => err.response.data)
    }, [props.post.id]);

    useEffect(() => {
        feedService.getCommentCountByPostId(props.post.id)
            .then(res=>setPostCommentCount(res))
            .catch(err=>err.message.data)
    }, []);

    function handleOpenComments() {
        if (getTokenState()) {
            setOpenedComments(!openedComments);
        } else {
            navigate("/login")
        }
    }

    function handleLikePost(liked: boolean) {
        // Update the like status and like count
        setIsLiked(liked);
        setNumOfLikes(liked ? numOfLikes + 1 : numOfLikes - 1);
    }

    function handlePostEdit(updatedPost: Post) {
        props.onEdit(updatedPost);
        // setIsEdited(updatedPost.isEdited);

    }

    return (

        <div className="postCard">
            <div className="postCardWrapper">
                <PostTop
                    setPosts={props.setPosts}
                    user={props.user}
                    post={props.post}
                    onDelete={props.onDelete}
                    onEdit={handlePostEdit}
                />
                <PostCenter post={props.post}/>
                <PostBottom
                    postCommentCount={postCommentCount}
                    setPostCommentCount={setPostCommentCount}
                    isLiked={isLiked}
                    numOfLikes={numOfLikes}
                    post={props.post}
                    handleOpenComments={handleOpenComments}
                />
                <PostActions
                    post={props.post}
                    onLikePost={handleLikePost}
                    isLiked={isLiked}
                    numOfLikes={numOfLikes}
                    handleOpenComments={handleOpenComments}
                />
                {openedComments &&
                    <div className="commentSection">
                        {/*<AddComment post={props.post}/>*/}
                    <CommentsOnPost
                        setPostCommentCount={setPostCommentCount}
                        postCommentCount={postCommentCount}
                        post={props.post}
                    />
                    </div>}
            </div>
        </div>
    );
}
