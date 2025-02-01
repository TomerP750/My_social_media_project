import "./UserProfileDetails.css";
import {authStore} from "../../../Redux/AuthSlice.ts";
import {NavLink} from "react-router-dom";
import {User} from "../../../Models/User.ts";
import {useEffect, useState} from "react";
import userService from "../../../Services/UserService.ts";
import {EditProfile} from "../EditProfile/EditProfile.tsx";


interface UserProfileDetailsProps {
    user: User
}
export function UserProfileDetails(props: UserProfileDetailsProps): JSX.Element {

    const [followers, setFollowers] = useState<number>(0);
    const [followings, setFollowings] = useState<number>(0);
    const [followed, setFollowed] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [editProfileModalOpened, setEditProfileModalOpened] = useState<boolean>(true);

    function handleEditProfileModalOpened() {
        setEditProfileModalOpened(!editProfileModalOpened);
    }
    function handleFollowersStatClicked() {

    }

    function handleFollowingStatClicked() {

    }

    function handleFollowUnfollow(id: number) {
        userService.followUnfollowUser(id)
            .then(res => setFollowed(res))
            .catch(err => err.response.data)
    }

    useEffect(() => {
        userService.getAccountDetails()
            .then(res=> setUser(res))
            .catch(err => err.repsonse.data)
    }, []);

    useEffect(() => {
        userService.getFollowersCount(props.user.userName)
            .then(res => setFollowers(res))
            .catch(err=> err.response.data)
        userService.getFollowingsCount(props.user.userName)
            .then(res => setFollowings(res))
            .catch(err => err.response.data)
    }, [followed]);


    return (
        <div className="userProfileDetails">
            <div className="leftSection">
                <div className="fullNameAndFollowStats">
                    <span className="fullName">{props.user && props.user.firstName} {props.user && props.user.lastName}</span>
                    <div className="followStats">
                            <span onClick={handleFollowersStatClicked}
                                  className="followers">{followers} Followers</span>
                        <span onClick={handleFollowingStatClicked}
                              className="followings">{followings} Followings</span>
                    </div>
                </div>
            </div>
            <div className="rightSection">
                {user && (props.user && props.user.id) === user.id ?
                    <div onClick={handleEditProfileModalOpened}
                         className={"editProfileButton"}>Edit Profile</div>
                    :
                    <div onClick={()=>handleFollowUnfollow(props.user.id)} className={"followUnfollowButton"}>
                        {followed ? <span>Unfollow</span> : <span>Follow</span>}
                    </div>}
            </div>

            {editProfileModalOpened && <EditProfile/>}
        </div>
    );
}
