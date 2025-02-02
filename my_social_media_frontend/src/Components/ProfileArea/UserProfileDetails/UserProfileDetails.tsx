import "./UserProfileDetails.css";
import {authStore} from "../../../Redux/AuthSlice.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {User} from "../../../Models/User.ts";
import {useEffect, useState} from "react";
import userService from "../../../Services/UserService.ts";
import {EditProfile} from "../EditProfile/EditProfile.tsx";
import {FollowersModal} from "../FollowersModal/FollowersModal.tsx";
import {FollowingsModal} from "../FollowingsModal/FollowingsModal.tsx";


interface UserProfileDetailsProps {
    user: User
}
export function UserProfileDetails(props: UserProfileDetailsProps): JSX.Element {

    const [followers, setFollowers] = useState<number>(0);
    const [followings, setFollowings] = useState<number>(0);
    const [followed, setFollowed] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('');

    function handleModalOpen(type: string) {
        setModalType(type);
        setModalOpened(true);
    }

    function handleFollowUnfollow(id: number) {
        userService.followUnfollowUser(id)
            .then(res => setFollowed(res))
            .catch(err => err.response.data)
    }

    useEffect(() => {
        userService.getAccountDetails()
            .then(res=> setLoggedInUser(res))
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

    useEffect(() => {
        // Ensure the effect only runs when both loggedInUser and profile user are available
        if (loggedInUser && props.user && loggedInUser.id !== props.user.id) {
            userService.isUserFollowed(loggedInUser.id, props.user.id)
                .then(res => setFollowed(res))
                .catch(err => console.error(err.response?.data));
        }
    }, [loggedInUser, props.user]);

    // return (
    //     <div className="userProfileDetails">
    //
    //         <div className="leftSection">
    //             <div className="fullNameAndFollowStats">
    //                 <span className="fullName">{props.user && props.user.firstName} {props.user && props.user.lastName}</span>
    //                 <div className="followStats">
    //                         <span onClick={()=>handleModalOpen("followers")}
    //                               className="followers">{followers} Followers</span>
    //                     <span onClick={()=>handleModalOpen("followings")}
    //                           className="followings">{followings} Followings</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className="rightSection">
    //             {loggedInUser && (props.user && props.user.id) === loggedInUser.id ?
    //                 <div onClick={()=>handleModalOpen("edit")}
    //                      className={"editProfileButton"}>Edit Profile</div>
    //                 :
    //                 <div onClick={()=>handleFollowUnfollow(props.user.id)} className={"followUnfollowButton"}>
    //                     {followed ? <span>Unfollow</span> : <span>Follow</span>}
    //                 </div>}
    //         </div>
    //
    //         {modalOpened && modalType === "edit" && (
    //             <EditProfile onClose={() => setModalOpened(false)} />
    //         )}
    //         {modalOpened && modalType === "followers" && (
    //             <FollowersModal onClose={() => setModalOpened(false)}/>
    //         )}
    //         {modalOpened && modalType === "followings" && (
    //             <FollowingsModal onClose={() => setModalOpened(false)}/>
    //         )}
    //
    //
    //     </div>
    // );


    return (
        <div className="userProfileDetails">
            <div className="leftSection">
                <div className="fullNameAndFollowStats">
                    <span className="fullName">{props.user.firstName} {props.user.lastName}</span>
                    <div className="followStats">
                        <span onClick={() => handleModalOpen("followers")} className="followers">
                            {followers} Followers
                        </span>
                        <span onClick={() => handleModalOpen("followings")} className="followings">
                            {followings} Followings
                        </span>
                    </div>
                </div>
            </div>

            <div className="rightSection">
                {/* Show Edit Profile button only if the logged-in user is viewing their own profile */}
                {loggedInUser && loggedInUser.id === props.user.id ? (
                    <div onClick={() => handleModalOpen("edit")} className="editProfileButton">Edit Profile</div>
                ) : (
                    <div onClick={() => handleFollowUnfollow(props.user.id)} className="followUnfollowButton">
                        {followed ? <span>Unfollow</span> : <span>Follow</span>}
                    </div>
                )}
            </div>

            {/* Modal components for editing profile, followers, or followings */}
            {modalOpened && modalType === "edit" && (
                <EditProfile onClose={() => setModalOpened(false)} />
            )}
            {modalOpened && modalType === "followers" && (
                <FollowersModal onClose={() => setModalOpened(false)} />
            )}
            {modalOpened && modalType === "followings" && (
                <FollowingsModal onClose={() => setModalOpened(false)} />
            )}
        </div>
    );

}
