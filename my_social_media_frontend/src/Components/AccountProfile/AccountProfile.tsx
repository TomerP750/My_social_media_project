import "./AccountProfile.css";
import {useEffect, useState} from "react";
import {User} from "../../Models/User.ts";
import {NavLink, useLocation, useParams} from "react-router-dom";
import userService from "../../Services/UserService.ts";
import test from "../../assets/defaultProfilepic.png"
import {authStore} from "../../Redux/AuthSlice.ts";
import {LayoutRightSection} from "../LayoutArea/LayoutRightSection/LayoutRightSection.tsx";
import {StartPosting} from "../FeedAndPostsArea/PostArea/StartPosting/StartPosting.tsx";
export function AccountProfile(): JSX.Element {

    const [user, setUser] = useState<User>();
    const [followers, setFollowers] = useState<number>(0);
    const [followings, setFollowings] = useState<number>(0);
    const params = useParams();
    const userName = params.userName!;
    const [followersModalOpened, setFollowersModalOpened] = useState<boolean>(false);
    const [followingsModalOpened, setFollowingsModalOpened] = useState<boolean>(false);
    const [followersList, setFollowersList] = useState<User[]>([]);
    const [followingsList, setFollowingsList] = useState<User[]>([]);

    // const location = useLocation();
    // const hiddenRightSectionRoutes = [`/user/${user && user.userName}`];
    // const showRightSection = !hiddenRightSectionRoutes.includes(location.pathname);


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

    // useEffect(() => {
    //     userService.getUserFollowers()
    //         .then(res => setFollowers(res))
    //         .catch(err => err.response.data)
    //     userService.getUserFollowings()
    //         .then(res => setFollowings(res))
    //         .catch(err => err.response.data)
    // }, []);

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
            <div className="userProfileDetails">
                <div className="leftSection">
                    <div className="profilePageAvatar"></div>
                    <div className="fullNameAndFollowStats">
                        <span className="fullName">{user && user.firstName} {user && user.lastName}</span>
                        <div className="followStats">
                            <span onClick={handleFollowersStatClicked} className="followers">{followers} Followers</span>
                            <span onClick={handleFollowingStatClicked} className="followings">{followings} Followings</span>
                        </div>
                    </div>
                </div>
                <div className="rightSection">
                    {(user && user.userName) === authStore.getState().userName && <NavLink className={"editProfileButton"} to={`/edit/${authStore.getState().userName}`}>Edit Profile</NavLink>}
                </div>
            </div>


            {/*{showRightSection && <LayoutRightSection/>}*/}
        </div>
    );
}
