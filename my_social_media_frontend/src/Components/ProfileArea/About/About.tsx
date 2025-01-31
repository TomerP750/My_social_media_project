import "./About.css";
import {useEffect, useState} from "react";
import userService from "../../../Services/UserService.ts";
import {User} from "../../../Models/User.ts";
import {UserProfileDetails} from "../../../Models/UserProfileDetails.ts";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Post} from "../../../Models/Post.ts";


interface AboutProps {
    user: User
    onSaveEdit: (updatedAbout: string) => void
}
export function About(props: AboutProps): JSX.Element {

    const [bio, setBio] = useState<UserProfileDetails>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    const [content, setContent] = useState<string>('');

    function handleContentWrite(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
    }

    useEffect(() => {
        userService.getUserProfileDetailsByUserId(props.user.id)
            .then(res => setBio(res))
            .catch(err => err.response.data)
    }, []);

    const handleSave = () => {
        props.onSaveEdit(content);
        setIsModalOpen(false);
    };

    return (
        <div className="About">
            <div className="aboutTop">
                <h1 className={"aboutBioTitle"}>About</h1>
                <EditIcon
                    className={"aboutBioEditIcon"}
                    onClick={() => setIsModalOpen(true)} // Open modal on edit click
                />
            </div>

            <div className="aboutBioContent">
            <p className={"aboutBioText"}>{bio?.about}</p>
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
                            <button className="save-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
