import "./PostTop.css";

import {authStore} from "../../../../../Redux/AuthSlice.ts";
import defaultProfilePic from "../../../../../assets/defaultProfilepic.png";
import {MoreVert} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Post} from "../../../../../Models/Post.ts";
import {timeAgo} from "../../../../../Util.ts";
import {User} from "../../../../../Models/User.ts";
import {EditPost} from "../../EditPost/EditPost.tsx";
import userService from "../../../../../Services/UserService.ts";


interface PostTopProps {
    user: User
    post: Post
    onDelete: (postId: number) => void;
    onEdit: (updatedPost: Post) => void;
}

export function PostTop(props: PostTopProps): JSX.Element {

    const [timeAgoText, setTimeAgoText] = useState<string>('');
    const [openedMoreVert, setOpenedMoreVert] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    function handleSaveEdit(updatedPost: Post) {
        props.onEdit(updatedPost);
        setIsModalOpen(false);
    }

    function handleChangeSelect(val: string) {

        if(val === "delete") {
            const deleteSure = window.confirm("Are you sure you want to delete?")
            if (deleteSure) {
                props.onDelete(props.post.id);
            }
            setOpenedMoreVert(false);
        }
        if (val === "edit") {
            setIsModalOpen(true)
            setOpenedMoreVert(false);
        }
    }

    const handleCloseModal = () => {
        setOpenedMoreVert(false)
        setIsModalOpen(false);
        navigate("/");
    };

    function handleFullNameClick() {
        navigate(`/user/${props.post.author.userName}`)
    }

    function handleMoreVertClick() {
        setOpenedMoreVert(!openedMoreVert);
    }

    useEffect(() => {
        const updateTime = () => {
            setTimeAgoText(timeAgo(props.post.datePosted));
        };

        updateTime(); // Initial update
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, [props.post.datePosted]);

    return (
        <>
        <div className="postTop">
            <div className="postTopLeft">
                {authStore.getState().token ? (
                    <img className={"profileImg"} src={"#"} alt="img" />
                ) : (
                    <img className={"profileImg"} src={defaultProfilePic} alt="img" />
                )}
                <span className={"postFullName"} onClick={handleFullNameClick}>
                    {props.post.author.firstName} {props.post.author.lastName}
                </span>
                <span className={"postTime"}>{timeAgoText}</span>
            </div>

            <div className="postTopRight">

                {(props.user.userName === props.post.author.userName) && <MoreVert className={"threeverticaldots"} onClick={handleMoreVertClick} />}

                {authStore.getState().userName === props.post.author.userName && openedMoreVert && (
                    <div className="postOptionsDropdown">
                        <div className="postOptionItem" onClick={() => handleChangeSelect("edit")}>Edit Post</div>
                        <div className="postOptionItem" onClick={() => handleChangeSelect("delete")}>Delete Post</div>
                    </div>
                )}
            </div>

        </div>
            {isModalOpen && <EditPost
                onSaveEdit={handleSaveEdit}
                onCloseModal={handleCloseModal}
                post={props.post}/>}
            </>
    );



}
