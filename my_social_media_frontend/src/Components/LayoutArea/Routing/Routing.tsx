import "./Routing.css";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "../../PageInformationArea/NotFound/NotFound.tsx";
import {Feed} from "../../FeedAndPostsArea/Feed/Feed.tsx";
import {Login} from "../../AuthArea/Login/Login.tsx";
import {AccountProfile} from "../../ProfileArea/AccountProfile/AccountProfile.tsx";
import {Register} from "../../AuthArea/Register/Register.tsx";
import {EditProfile} from "../../ProfileArea/EditProfile/EditProfile.tsx";
import {NotificationsList} from "../NavbarArea/NotificationsArea/NotificationsList/NotificationsList.tsx";

export function Routing(): JSX.Element {
    return (
        <div className="Routing">

			<Routes>

                <Route path={"/"} element={<Feed/>}/>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"user/:userName"} element={<AccountProfile/>}/>
                <Route path={"register"} element={<Register/>}/>
                <Route path={"notifications"} element={<NotificationsList/>}/>

                <Route path={"*"} Component={NotFound}/>
            </Routes>
        </div>
    );
}
