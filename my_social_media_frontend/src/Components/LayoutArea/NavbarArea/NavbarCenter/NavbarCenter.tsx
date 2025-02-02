import "./NavbarCenter.css";
import {Notifications} from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import {getTokenState} from "../../../../Util.ts";
import {useNavigate} from "react-router-dom";
import {SearchBar} from "../SearchBar/SearchBar.tsx";

export function NavbarCenter(): JSX.Element {

    const navigate = useNavigate();
    // const [notificationCounter, setNotificationCounter] = useState<number>(0);


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
            </div>
            <div className="navbarItem" onClick={handleMessagesClick}>
                <MessageIcon
                    className={"navbarItemLogo"}
                />
                <span className={"navbarItemText"}>Messages</span>
            </div>
            </div>
        </div>
    );
}
