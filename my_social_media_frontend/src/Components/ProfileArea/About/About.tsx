import "./About.css";
import {useEffect, useState} from "react";
import userService from "../../../Services/UserService.ts";
import {User} from "../../../Models/User.ts";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import {authStore} from "../../../Redux/AuthSlice.ts";
import {AboutBio} from "../../../Models/AboutBio.ts";


interface AboutProps {
    user: User
}
export function About(props: AboutProps): JSX.Element {

    const [bio, setBio] = useState<AboutBio>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    const [content, setContent] = useState<string>('');

    function handleContentWrite(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
    }

    useEffect(() => {
        userService.getAboutByUserId(props.user.id)
            .then(res => setBio(res))
            .catch(err => alert(err.response.data))
    }, []);

    function handleAboutBioEditSave() {
        if (props.user) {
            const about = new AboutBio(
                content
            )
            userService.editAboutBio(about)
                .then(res => alert("about updated"))
                .catch(err => alert(err.response.data))
            setIsModalOpen(false);
        }
    }

    return (
        <div className="About">
            <div className="aboutTop">
                <h1 className={"aboutBioTitle"}>About</h1>
                {authStore.getState().userName === props.user.userName && <EditIcon
                    className={"aboutBioEditIcon"}
                    onClick={() => setIsModalOpen(true)}
                />}
            </div>

            <div className="aboutBioContent">
                {bio && <p className={"aboutBioText"}>{bio.content}</p>}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit About Content</h2>
                        <textarea
                            value={content}
                            className="edit-textarea"
                            rows={6}
                            placeholder="Edit your about content here..."
                            onChange={handleContentWrite}
                        ></textarea>

                        <div className="modal-actions">
                            <button className="save-btn" onClick={handleAboutBioEditSave}>Save</button>
                            <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}
