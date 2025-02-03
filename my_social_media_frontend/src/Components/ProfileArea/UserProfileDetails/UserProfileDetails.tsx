import "./UserProfileDetails.css";
import {User} from "../../../Models/User.ts";
import {useEffect, useState} from "react";
import userService from "../../../Services/UserService.ts";
import {EditProfile} from "../EditProfile/EditProfile.tsx";
import {FollowersModal} from "../FollowersModal/FollowersModal.tsx";
import {FollowingsModal} from "../FollowingsModal/FollowingsModal.tsx";
import feedService from "../../../Services/FeedService.ts";
interface UserProfileDetailsProps {
    user: User
    loggedInUser: User
}
export function UserProfileDetails(props: UserProfileDetailsProps): JSX.Element {

    const [followersLength, setFollowersLength] = useState<number>(0);
    const [followingsLength, setFollowingsLength] = useState<number>(0);
    const [followed, setFollowed] = useState<boolean>(false);
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('');

    function handleModalOpen(type: string) {
        setModalType(type);
        setModalOpened(true);
    }
    function handleFollowUnfollow(id: number) {
        userService.followUnfollowUser(id)
            .then(res => {
                setFollowed(res)
            })
            .catch(err => err.response.data)
    }

    useEffect(() => {
        feedService.getProfileFollowers(props.user.id)
            .then(res => setFollowersLength(res.length))
            .catch(err => alert(err.response.data))
        feedService.getProfileFollowings(props.user.id)
            .then(res => setFollowingsLength(res.length))
            .catch(err => alert(err.response.data))
    }, [followed]);


    useEffect(() => {
        if (props.loggedInUser) {
            userService.isUserFollowed(props.loggedInUser.id, props.user.id)
                .then(res => setFollowed(res))
                .catch(err => alert(err.response.data))
        }
    }, []);


    return (
        <div className="userProfileDetails">

            <div className="leftSection">
                <div className="fullNameAndFollowStats">
                    <span className="fullName">{props.user && props.user.firstName} {props.user && props.user.lastName}</span>
                    <div className="followStats">
                            <span onClick={()=>handleModalOpen("followers")}
                                  className="followers">{followersLength} Followers</span>
                        <span onClick={()=>handleModalOpen("followings")}
                              className="followings">{followingsLength} Followings</span>
                    </div>
                </div>
            </div>

            <div className="rightSection">
                {props.loggedInUser && (props.user && props.user.id) === props.loggedInUser.id ?
                    <div onClick={()=>handleModalOpen("edit")}
                         className={"editProfileButton"}>Edit Profile</div>
                    :
                    <div onClick={()=>handleFollowUnfollow(props.user.id)} className={"followUnfollowButton"}>
                        {followed ? <span>Unfollow</span> : <span>Follow</span>}
                    </div>}
            </div>

            {modalOpened && modalType === "edit" && (
                <EditProfile onClose={() => setModalOpened(false)} />
            )}
            {modalOpened && modalType === "followers" && (
                <FollowersModal
                    user={props.user}
                    onClose={() => setModalOpened(false)}/>
            )}
            {modalOpened && modalType === "followings" && (
                <FollowingsModal
                    user={props.user}
                    onClose={() => setModalOpened(false)}/>
            )}


        </div>
    );
}
