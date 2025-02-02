import "./PostCommentCard.css";
import {PostComment} from "../../../../Models/PostComment.ts";
import {useEffect, useState} from "react";
import {timeAgo} from "../../../../Util.ts";
import dif from "../../../../assets/defaultProfilepic.png"
import {useNavigate} from "react-router-dom";
import {User} from "../../../../Models/User.ts";
import userService from "../../../../Services/UserService.ts";
import {MoreVert} from "@mui/icons-material";
import {authStore} from "../../../../Redux/AuthSlice.ts";
import {PostCommentMenu} from "../PostCommentMenu/PostCommentMenu.tsx";


interface PostCommentCardProps {
    postComment: PostComment
    postCommentCount: number
    postComments: PostComment[]
    setPostCommentCount: React.Dispatch<React.SetStateAction<number>>;
    setPostComments: React.Dispatch<React.SetStateAction<PostComment[]>>;
}
export function PostCommentCard(props: PostCommentCardProps): JSX.Element {

    const [timeAgoText, setTimeAgoText] = useState<string>("");
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    const [openedMoreVert, setOpenedMoreVert] = useState<boolean>(false);
    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    useEffect(() => {
        userService.getAccountDetails()
            .then(res=>setUser(res))
            .catch(err=>err.response.data)
    }, []);


    useEffect(() => {
        const updateTime = () => {
            setTimeAgoText(timeAgo(props.postComment.dateCommented));
        };

        updateTime(); // Initial update
        const intervalId = setInterval(updateTime, 60_000);

        return () => clearInterval(intervalId);
    }, [props.postComment.dateCommented]);

    function handleFullNameClick() {
        navigate(`/account/${props.postComment.commentAuthor.userName}`)
    }

    function handleMoreVertClick() {
        setOpenedMoreVert(!openedMoreVert);
    }

    function handleDeletePostComment() {
        const answer = window.confirm("are you sure you want to delete the comment?")
        if (answer) {
            userService.deleteComment(props.postComment.id)
                .then(res => {
                    props.setPostCommentCount(props.postCommentCount - 1)
                    props.setPostComments(props.postComments.filter((postComment) => postComment.id !== props.postComment.id))
                    alert("comment deleted")
                })
                .catch(err => err.response.data)
            setOpenedMoreVert(false);
        }
    }


    return (
        <>

            <div className="PostComment">
                <div className="PostComment-header">

                    <div className="postCommentImageAndFullName">
                        <img
                            // src={props.postComment.commentAuthor.image}
                            src={dif}
                            alt="Profile"
                            className="commentAuthor-image"
                        />
                        <span className="commentAuthor-name"
                              onClick={handleFullNameClick}>{props.postComment.commentAuthor.firstName} {props.postComment.commentAuthor.lastName}</span>
                    </div>

                    <div className="commentDatePostedAndThreeDotsContainer">
                        <span className="timeAgo">{timeAgoText}</span>
                        {user && user.id === props.postComment.commentAuthor.id && <MoreVert className={"threeDotsPostComment"} onClick={handleMoreVertClick}/>}
                        {authStore.getState().userName === props.postComment.commentAuthor.userName && openedMoreVert && (
                            <PostCommentMenu
                                postComment={props.postComment}
                                onDelete={handleDeletePostComment}
                            />
                        )}
                    </div>

                </div>
                <p className="commentMessage">{props.postComment.message}</p>
            </div>
            <hr className={"postCommentHr"}/>
        </>
    );
}
