import "./LayoutRightSection.css";
import {useEffect, useState} from "react";
import {User} from "../../../Models/User.ts";
import userService from "../../../Services/UserService.ts";
import {useNavigate} from "react-router-dom";
import {authStore} from "../../../Redux/AuthSlice.ts";

export function LayoutRightSection(): JSX.Element {

    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        userService.getAccountDetails()
            .then(res => setUser(res))
            .catch(err => err.response.data)
    }, []);

    return (
        <div className="LayoutRightSection">
            {user &&
			<div className="rightSectionWrapper">
                <div className="profileBox">
                    <div className="profileBoxTop">
                        <div className="profileBoxBanner"></div>
                        <div className="profilePictureAndName">
                        <div className="rightBoxProfilePicture"></div>
                        <span onClick={()=>navigate(`/user/${authStore.getState().userName}`)} className="profileName">{user && user.firstName} {user && user.lastName}</span>
                        </div>
                    </div>
                    <div className="profileBoxBottom">

                    </div>
                </div>
            </div>}
        </div>

    );
}
