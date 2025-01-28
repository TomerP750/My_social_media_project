import "./AddComment.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getTokenState} from "../../../../Util.ts";
import userService from "../../../../Services/UserService.ts";
import {PostComment} from "../../../../Models/PostComment.ts";
import {Post} from "../../../../Models/Post.ts";
import {User} from "../../../../Models/User.ts";


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
        userService.addComment(new PostComment(
            0,
            props.post,
            new Date(),
            user,
            content
        )).then((newPostComment) => {
            props.setPostComments((prevComments: PostComment[]) => [...prevComments, newPostComment]);
            setContent('')

        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <hr className={"hrSeperate"}/>
        <div className="AddComment">
            <div className="addCommentTop">
                {/*<img className={"userImage"} src={props.user.image} alt=""/>*/}
                <div className="addCommentUserImage"></div>
                <input placeholder={"Whats on your mind?"}
                       className={"addCommentInput"}
                       type="text"
                       onChange={handleChange}
                       onClick={handleClickOnAddComment}/>
                <button className={"addCommentButton"} onClick={handleAddComment}>Comment</button>
            </div>
        </div>
            </>
    );
}
