import "./StartPosting.css";
import {useState} from "react";
import userService from "../../../../Services/UserService.ts";
import {Post} from "../../../../Models/Post.ts";
import {User} from "../../../../Models/User.ts";
import {authStore} from "../../../../Redux/AuthSlice.ts";
import {PermMedia} from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {getTokenState} from "../../../../Util.ts";
import {useNavigate} from "react-router-dom";
import TagIcon from '@mui/icons-material/Tag';


interface StartPostingProps {
    user: User
    posts: Post[]
    setPosts: React.Dispatch<React.SetStateAction<any>>;
}

export function StartPosting(props: StartPostingProps): JSX.Element {
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);  // Update content as user types
    };

    const handlePost = () => {

        if (content.trim().length > 0 && content.trim().length < 255 && authStore.getState().token) {
             userService.addPost(new Post(
                0,
                new Date(),
                props.user,
                content,
                0
            )).then((newPost) => {
                props.setPosts([...props.posts, newPost])
                 setContent('')

            }).catch((err) => {
                console.log(err)
            })
        }


    };

    function handleClickOnStartPosting() {
        if (!getTokenState()) {
            navigate("/login")
        }
    }

    return (
        <div className="startPosting">
            <div className="startPostingWrapper">
                <div className="shareTop">
                    {/*<img className={"userImage"} src={props.user.image} alt=""/>*/}
                    <div className="userImage"></div>
                    <input placeholder={"Whats on your mind?"}
                           className={"startPostInput"}
                           type="text"
                           value={content}
                           onChange={handleChange}
                           onClick={handleClickOnStartPosting}/>
                </div>
                <hr className={"startPositingHr"}/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia className={"shareOptionIcon"} sx={{color: "black"}}/>
                            <span className={"shareOptionText"}>Image</span>
                        </div>
                        <div className="shareOption">
                            <LocationOnIcon className={"shareOptionIcon"} sx={{color: "black"}}/>
                            <span className={"shareOptionText"}>Location</span>
                        </div>
                        <div className="shareOption">
                            <TagIcon className={"shareOptionIcon"} sx={{color: "black"}}/>
                            <span className={"shareOptionText"}>Tag</span>
                        </div>
                    </div>
                    <button className={"postButton"} onClick={handlePost}>Post</button>
                </div>
            </div>

        </div>
    );
}
