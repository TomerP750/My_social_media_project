import "./EditProfile.css";
import {useForm} from "react-hook-form";
import {User} from "../../../Models/User.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import userService from "../../../Services/UserService.ts";


interface EditProfileProps {
    onClose: () => void
}

export function EditProfile(props: EditProfileProps): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<User>();
    const navigate = useNavigate();
    const params = useParams();
    const userName = params.userName!;

    // const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        userService
            .getProfileByUserName(userName)
            .then((user) => {
                setValue("id", user.id)
                setValue("firstName", user.firstName);
                setValue("lastName", user.lastName);
                setValue("image", "");
                setValue("password", "");
                setValue("email", user.email);
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, [userName, setValue]);

    function sendUser(user: User) {
        if (user) {
            user.userName = userName;
            console.log("user: ", user);
            userService.updateUser(user)
                .then(() => {
                    navigate(`/user/${user.userName}`);
                })
                .catch(err => alert(err.response.data));
        }
    }

    return (
        <>
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={props.onClose}>&times;</span>
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleSubmit(sendUser)}>
                            <input
                                type="text"
                                placeholder="First Name"
                                {...register("firstName")}
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                {...register("lastName")}
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                {...register("userName")}
                                className="input-field"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                className="input-field"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Image Url"
                                {...register("image")}
                                className="input-field"
                            />
                            <div className="button-container">
                                <button type="submit" className="save-button">
                                    Save
                                </button>
                                <button type="button" className="cancel-button" onClick={props.onClose}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );


}
