import "./AccountProfile.css";
import {useEffect, useState} from "react";
import {User} from "../../Models/User.ts";
import {NavLink, useParams} from "react-router-dom";
import userService from "../../Services/UserService.ts";
import test from "../../assets/defaultProfilepic.png"
import {authStore} from "../../Redux/AuthSlice.ts";
export function AccountProfile(): JSX.Element {

    const [user, setUser] = useState<User>();
    const [followers, setFollowers] = useState<number>(0);
    const [followings, setFollowings] = useState<number>(0);
    const params = useParams();
    const userName = params.userName!;
    const [followersModalOpened, setFollowersModalOpened] = useState<boolean>(false);
    const [followingsModalOpened, setFollowingsModalOpened] = useState<boolean>(false);

    useEffect(() => {
        userService.getProfileByUserName(userName)
            .then(res => {
                setUser(res)
            })
            .catch(err => err.response.data)
        userService.getFollowersCount(userName)
            .then(res => setFollowers(res))
            .catch(err=> err.response.data)
        userService.getFollowingsCount(userName)
            .then(res => setFollowings(res))
            .catch(err => err.response.data)
    }, []);

    // console.log(user)

    function handleFollowersStatClicked() {

    }

    function handleFollowingStatClicked() {

    }

    return (
        <div className="AccountProfile">
            <div className="banner">
                <img src={test}/>
            </div>
            <div className="profileFullName">
                <span className={"profileFirstName"}>{user && user.firstName}</span>
                <span className={"profileLastName"}>{user && user.lastName}</span>
            </div>
            <div className="accountMainInfo">

                <div className="profileFollowStats">
                    <span className={"followStat"} onClick={handleFollowersStatClicked}>{followers} Followers</span>
                    <span className={"followStat"} onClick={handleFollowingStatClicked}>{followings} following</span>
                </div>
                {authStore.getState().userName === userName && <NavLink className={"editProfileButton"} to={`/edit/${userName}`}>Edit Profile</NavLink>}
            </div>
        </div>
    );
}
