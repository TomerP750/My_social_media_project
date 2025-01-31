import "./AccountProfile.css";
import {useEffect, useState} from "react";
import {User} from "../../../Models/User.ts";
import {NavLink, useLocation, useParams} from "react-router-dom";
import userService from "../../../Services/UserService.ts";
import test from "../../../assets/defaultProfilepic.png"
import {UserProfileDetails} from "../UserProfileDetails/UserProfileDetails.tsx";
import {About} from "../About/About.tsx";
import {useForm} from "react-hook-form";
export function AccountProfile(): JSX.Element {

    const [user, setUser] = useState<User>();
    const params = useParams();
    const userName = params.userName!;

    useEffect(() => {
        userService.getProfileByUserName(userName)
            .then(res => {
                setUser(res)
            })
            .catch(err => err.response.data)
    }, []);

    const handleSaveEdit = (updatedAbout: string) => {
        if (user) {
            // Update the about content in the local state
            const updatedUser = { ...user, about: updatedAbout };

            // Update the state with the new user info
            setUser(updatedUser);

            // Call the service to update the backend
            userService.editUserProfileAboutBio(user.id, updatedAbout)
                .then(() => {
                    console.log("About content updated successfully");
                })
                .catch((err) => {
                    console.error("Error updating about content", err);
                });
        }
    };



    return (
        <>
        <div className="AccountProfile">
            <div className="banner">
                <img src={test}/>
            </div>
            <div className="profilePageAvatar"></div>

            {user && <UserProfileDetails user={user}/>}


            <hr className={"userProfileHr"}/>

        </div>
            {/*TEST AREA*/}
            <div className="aboutBioContainer">
            {user && <About onSaveEdit={handleSaveEdit} user={user}/>}
            </div>
            {/*TEST AREA*/}
            </>
    );
}
