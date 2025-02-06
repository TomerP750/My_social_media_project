import "./NavbarCenter.css";
import {Notifications} from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import {getTokenState} from "../../../../Util.ts";
import {useNavigate} from "react-router-dom";
import {SearchBar} from "../SearchBar/SearchBar.tsx";
import {useEffect, useState} from "react";
import userService from "../../../../Services/UserService.ts";

export function NavbarCenter(): JSX.Element {

    const navigate = useNavigate();
    const [notificationCounter, setNotificationCounter] = useState<number>(0);
    const [messagesCounter, setMessagesCounter] = useState<number>(0);
    const [hasRead, setHasRead] = useState<boolean>(false);


    useEffect(() => {

        if (!hasRead) {
            userService.getNotificationsCount()
                .then(res => setNotificationCounter(res))
                .catch(err => err.response.data)
        }
    }, []);

    function handleNotificationClick() {
        if (!getTokenState()) {
            navigate("/login");
        }
        navigate("/notifications");
        setNotificationCounter(0);
        setHasRead(!hasRead);
    }

    function handleMessagesClick() {
        if (!getTokenState()) {
            navigate("/login");
        }
    }



    return (
        <div className="navbarCenter">
            <SearchBar/>
            <div className="navbarItems">
            <div className="navbarItem">
                <Notifications
                    className={"navbarItemLogo"}
                    onClick={handleNotificationClick}
                />
                <span className={"navbarItemText"}>Notifications</span>
                {notificationCounter > 0 && <span className={"notificationCounter"}>{notificationCounter}</span>}
            </div>

            <div className="navbarItem" onClick={handleMessagesClick}>
                <MessageIcon
                    className={"navbarItemLogo"}
                />
                <span className={"navbarItemText"}>Messages</span>
                {messagesCounter > 0 && <span className="messagesCounter">{messagesCounter}</span>}
            </div>
            </div>
        </div>
    );
}
