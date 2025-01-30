import "./AccountProfile.css";
import {useEffect, useState} from "react";
import {User} from "../../../Models/User.ts";
import {NavLink, useLocation, useParams} from "react-router-dom";
import userService from "../../../Services/UserService.ts";
import test from "../../../assets/defaultProfilepic.png"
import {UserProfileDetails} from "../UserProfileDetails/UserProfileDetails.tsx";
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

    return (
        <div className="AccountProfile">
            <div className="banner">
                <img src={test}/>
            </div>
            <div className="profilePageAvatar"></div>

            {user && <UserProfileDetails user={user}/>}


            <hr className={"userProfileHr"}/>

            {/*<div className="userPageContent">*/}
            {/*    {(user && user.userName) === authStore.getState().userName && <StartPosting/>}*/}
            {/*</div>*/}

        </div>
    );
}
