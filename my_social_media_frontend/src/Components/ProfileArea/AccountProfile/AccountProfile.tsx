import "./AccountProfile.css";
import {useEffect, useState} from "react";
import {User} from "../../../Models/User.ts";
import {NavLink, useLocation, useParams} from "react-router-dom";
import userService from "../../../Services/UserService.ts";
import test from "../../../assets/defaultProfilepic.png"
import {UserProfileDetails} from "../UserProfileDetails/UserProfileDetails.tsx";
import {About} from "../About/About.tsx";
import EditIcon from "@mui/icons-material/Edit";
import {authStore} from "../../../Redux/AuthSlice.ts";
export function AccountProfile(): JSX.Element {

    const [user, setUser] = useState<User>();
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const params = useParams();
    const userName = params.userName!;

    useEffect(() => {
        userService.getProfileByUserName(userName)
            .then(res => {
                setUser(res)
            })
            .catch(err => err.response.data)
    }, [userName]);

    useEffect(() => {
        userService.getAccountDetails()
            .then(res => setLoggedInUser(res))
            .catch(err => alert(err.response.data))
    }, []);

    return (
        <>
        <div className="AccountProfile">
            <div className="banner">
                <img src={test}/>
                {user && (authStore.getState().userName === user.userName) && <EditIcon className={"banner-edit-icon"}/>}
            </div>
            <div className="profilePageAvatar"></div>

            {user && <UserProfileDetails
                loggedInUser={loggedInUser}
                user={user}
            />}

            <hr className={"userProfileHr"}/>

        </div>
            {user && <About user={user}/>}
            </>
    );
}
