import "./LayoutLeftSection.css";
import {RssFeed} from "@mui/icons-material";
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import {Bookmark} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export function LayoutLeftSection(): JSX.Element {

    const navigate = useNavigate();


    return (
        <div className="LayoutLeftSection">
            <div className="leftSectionWrapper">
                <ul className={"listItems"}>
                    <li className="listItem">
                        <RssFeed className={"sidebarIcon"}/>
                        <span className="sideBarListItemText" onClick={()=>navigate("/")}>Feed</span>
                    </li>
                    <li className="listItem">
                        <ChatIcon className={"sidebarIcon"}/>
                        <span className="sideBarListItemText">Chat</span>
                    </li>
                    <li className="listItem">
                        <GroupsIcon className={"sidebarIcon"}/>
                        <span className="sideBarListItemText">Groups</span>
                    </li>
                    <li className="listItem">
                        <Bookmark className={"sidebarIcon"}/>
                        <span className="sideBarListItemText">Bookmarks</span>
                    </li>

                </ul>
                <button className="expandButton">Show More</button>
                <hr className="leftSectionHr"/>
                {/*    Add component that gives the followings of the user and make cast it into a list */}
            </div>
        </div>
    );
}
