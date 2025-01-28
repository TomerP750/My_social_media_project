import "./PostCard.css";
import {Post} from "../../../../Models/Post.ts";
import GradeIcon from '@mui/icons-material/Grade';
import userService from "../../../../Services/UserService.ts";
import {useEffect, useState} from "react";
import feedService from "../../../../Services/FeedService.ts";
import {getTokenState, timeAgo} from "../../../../Util.ts";
import {Comment} from "@mui/icons-material";
import defaultProfilePic from "../../../../assets/defaultProfilepic.png"
import {MoreVert} from "@mui/icons-material";
import profilePic from "../../../../assets/profilepicturetest.png"
import {CommentsOnPost} from "../CommentsOnPost/CommentsOnPost.tsx";
import {useNavigate} from "react-router-dom";
import {authStore} from "../../../../Redux/AuthSlice.ts";
import {AddComment} from "../AddComment/AddComment.tsx";

interface PostProps {
    post: Post
}

export function PostCard(props: PostProps): JSX.Element {

    let [numOfLikes, setNumOfLikes] = useState<number>(props.post.likeCount);
    const [timeAgoText, setTimeAgoText] = useState<string>('');
    const [postCommentCount, setPostCommentCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [openedComments, setOpenedComments] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleLike() {
        userService.likeUnlike(props.post)
            .then(res=> {
                setNumOfLikes(prevLikes => res.data ? prevLikes + 1 : prevLikes - 1)
                setIsLiked(!isLiked)
            })
            .catch(err=>{
                navigate("/login")
            })
    }

    function handleOpenComments() {
        if (getTokenState()) {
            setOpenedComments(!openedComments);
        } else {
            navigate("/login")
        }
    }

    function handleFullNameClick() {
        navigate(`/user/${props.post.author.userName}`)
    }

    useEffect(() => {
        feedService.getCommentCountByPostId(props.post.id)
            .then(res=>setPostCommentCount(res))
            .catch(err=>err.message.data)
    }, []);

    useEffect(() => {
        const updateTime = () => {
            setTimeAgoText(timeAgo(props.post.datePosted));
        };

        updateTime(); // Initial update
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, [props.post.datePosted]);

    return (

        <div className="postCard">
            <div className="postCardWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {authStore.getState().token ?
                            <img className={"profileImg"} src={"#"} alt="img"/> : <img className={"profileImg"} src={defaultProfilePic} alt="img"/>}
                        <span className={"postFullName"} onClick={handleFullNameClick}>{props.post.author.firstName} {props.post.author.lastName}</span>
                        <span className={"postTime"}>{timeAgoText}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert className={"threeverticaldots"}/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className={"postText"}>{props.post.content}</span>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <span className={"likeCounterText"}>{numOfLikes}</span>
                        <GradeIcon className={`star-icon ${isLiked ? 'active' : ''}`} />
                    </div>
                    <div className="postBottomRight">
                        <span className={"postCommentText"} onClick={handleOpenComments}>{postCommentCount} Comments</span>
                    </div>
                </div>
                <div className="postActions">
                    <span className={"likePost"} onClick={handleLike}>Like</span>
                    <span className={"commentPost"} onClick={handleOpenComments}>Comment</span>
                    <span className={"sharePost"}>Share</span>
                </div>
                {openedComments &&
                    <div className="commentSection">
                        {/*<AddComment post={props.post}/>*/}
                    <CommentsOnPost post={props.post}/>
                    </div>}
            </div>
        </div>
    );
}
