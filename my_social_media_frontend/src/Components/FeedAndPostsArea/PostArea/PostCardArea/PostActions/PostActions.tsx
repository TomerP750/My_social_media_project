import "./PostActions.css";
import userService from "../../../../../Services/UserService.ts";
import {getTokenState} from "../../../../../Util.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Post} from "../../../../../Models/Post.ts";

interface PostActionsProps {
    post: Post
    handleOpenComments: () => void
}
export function PostActions(props: PostActionsProps): JSX.Element {

    let [numOfLikes, setNumOfLikes] = useState<number>(props.post.likeCount);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [openedComments, setOpenedComments] = useState<boolean>(false);
    const navigate = useNavigate();
    function handleLike() {
        userService.likeUnlike(props.post)
            .then(res=> {
                // setNumOfLikes(props.post.likeCount)
                // setIsLiked(res)
                setIsLiked(res)
                if (res) {
                    setNumOfLikes(numOfLikes + 1)
                } else {
                    setNumOfLikes(numOfLikes - 1)
                }
            })
            .catch(err=>{
                navigate("/login")
            })
    }

    return (
        <div className="postActions">
            <span className={"likePost"} onClick={handleLike}>Star</span>
            <span className={"commentPost"} onClick={props.handleOpenComments}>Comment</span>
            <span className={"sharePost"}>Share</span>
        </div>
    );
}
