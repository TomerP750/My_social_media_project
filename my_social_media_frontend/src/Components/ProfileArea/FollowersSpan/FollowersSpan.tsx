import "./FollowersSpan.css";
import {User} from "../../../Models/User.ts";
import {useNavigate} from "react-router-dom";


interface FollowersSpanProps {
    user: User
}
export function FollowersSpan(props: FollowersSpanProps): JSX.Element {

    const navigate = useNavigate();

    return (
        <div className="FollowersSpan">
            <div className="followerUser">
                <img src="#" alt=""/>
                <div className="followerFullName" onClick={() => navigate(`/user/${props.user.userName}`)}>
                    <span className={"followerModalFirstName"}>{props.user.firstName}</span>
                    <span className={"followerModalLastName"}>{props.user.lastName}</span>
                </div>
            </div>
        </div>
    );
}
