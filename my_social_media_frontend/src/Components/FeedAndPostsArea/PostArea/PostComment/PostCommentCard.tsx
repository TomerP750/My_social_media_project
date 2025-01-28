import "./PostCommentCard.css";
import {PostComment} from "../../../../Models/PostComment.ts";
import {useEffect, useState} from "react";
import {timeAgo} from "../../../../Util.ts";
import dif from "../../../../assets/defaultProfilepic.png"
import {useNavigate} from "react-router-dom";
import {User} from "../../../../Models/User.ts";
import userService from "../../../../Services/UserService.ts";
import {MoreVert} from "@mui/icons-material";


interface PostCommentProps {
    postComment: PostComment
}
export function PostCommentCard(props: PostCommentProps): JSX.Element {

    const [timeAgoText, setTimeAgoText] = useState<string>("");
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

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

    return (
        <>

            <div className="PostComment">
                <div className="PostComment-header">
                    <img
                        // src={props.postComment.commentAuthor.image}
                        src={dif}
                        alt="Profile"
                        className="commentAuthor-image"
                    />
                    <div className="commentAuthor-info">
            <span className="commentAuthor-name" onClick={handleFullNameClick}>
                {user && user.firstName} {user && user.lastName}
            </span>
                        <span className="timeAgo">{timeAgoText}</span>
                        {/*{user!.id === props.postComment.commentAuthor.id && <MoreVert/>}*/}
                    </div>
                </div>
                <p className="commentMessage">{props.postComment.message}</p>
            </div>
            <hr className={"postCommentHr"}/>
        </>
    );
}
