import "./AddComment.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getTokenState} from "../../../../Util.ts";
import userService from "../../../../Services/UserService.ts";
import {PostComment} from "../../../../Models/PostComment.ts";
import {Post} from "../../../../Models/Post.ts";
import {User} from "../../../../Models/User.ts";
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

interface AddCommentProps {
    user: User
    post: Post
    setPostComments: React.Dispatch<React.SetStateAction<any>>;
}
export function AddComment(props: AddCommentProps): JSX.Element {

    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        userService.getAccountDetails()
            .then(res=>setUser(res))
            .catch(err=>err.response.data)
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    function handleClickOnAddComment() {
        if (!getTokenState()) {
            navigate("/login")
        }
    }

    function handleAddComment() {
        if (user) {
            const newComment = new PostComment(
                0,             // Assuming the ID is generated on the server
                props.post,
                new Date(),
                user,
                content
            );

            userService.addComment(newComment)
                .then((addedComment) => {
                    props.setPostComments((prevComments: PostComment[]) => [
                        ...prevComments,
                        addedComment
                    ]);
                    setContent('');
                })
                .catch((err) => {
                    console.log("Error adding comment:", err); // Log the error if any
                });
        }
    }


    return (
        <>
            <hr className={"hrSeparate"}/>
            <div className="AddComment">
                <div className="addCommentTop">
                    {/*<img className={"userImage"} src={props.user.image} alt=""/>*/}
                    <div className="addCommentUserImage"></div>
                    <input placeholder={"Add Comment"}
                           className={"addCommentInput"}
                           type="text"
                           value={content}
                           onChange={handleChange}
                           onClick={handleClickOnAddComment}/>
                </div>
                <div className="addCommentBottom">
                    <div className="icons">
                        <AddReactionOutlinedIcon className={"addCommentIcon"}/>
                        <TagOutlinedIcon className={"addCommentIcon"}/>
                    </div>
                    <button className={"addCommentButton"} onClick={handleAddComment}>Comment</button>
                </div>
            </div>
            <hr className={"hrSeparate"}/>
        </>
    );
}
