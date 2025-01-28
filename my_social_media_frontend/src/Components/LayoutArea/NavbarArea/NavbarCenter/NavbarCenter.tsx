import "./NavbarCenter.css";
import {Notifications, Search} from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import {authStore} from "../../../../Redux/AuthSlice.ts";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {getTokenState} from "../../../../Util.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export function NavbarCenter(): JSX.Element {

    const navigate = useNavigate();
    const [notificationCounter, setNotificationCounter] = useState<number>(0);

    function handleNotificationClick() {
        if (!getTokenState()) {
            navigate("/login");
        }
    }

    function handleMessagesClick() {
        if (!getTokenState()) {
            navigate("/login");
        }
    }

    function handleaccountClick() {
        if (!getTokenState()) {
            navigate("/login");
        } else {
            navigate("/account")
        }
    }

    return (
        <div className="navbarCenter">
            <div className="searchBar">
                <Search className={"searchIcon"}/>
                <input placeholder={"Search for friend, post or video"} className={"searchInput"}/>
            </div>
            <div className="navbarItems">
                {/*{authStore.getState().token &&*/}
            <div className="navbarItem">
                <Notifications className={"navbarItemLogo"} onClick={handleNotificationClick}/>
                <span className={"navbarItemText"}>Notifications</span>
            </div>
                {/*{authStore.getState().token &&*/}
            <div className="navbarItem" onClick={handleMessagesClick}>
                <MessageIcon className={"navbarItemLogo"}/>
                <span className={"navbarItemText"}>Messages</span>
            </div>
            </div>
        </div>
    );
}
