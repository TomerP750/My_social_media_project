import "./FollowersSpan.css";
import {User} from "../../../Models/User.ts";
import {useNavigate} from "react-router-dom";


interface FollowersSpanProps {
    user: User
    onCloseModal: () => void
}
export function FollowersSpan(props: FollowersSpanProps): JSX.Element {

    const navigate = useNavigate();

    function handleFullNameClick() {
        navigate(`/user/${props.user.userName}`);
        props.onCloseModal();
    }

    return (
        <div className="FollowersSpan">
            <div className="followerUser">
                <img src="#" alt="Profile" />
                <div className="followerFullName" onClick={handleFullNameClick}>
                    <span className="followerModalFirstName">{props.user.firstName}</span>
                    <span className="followerModalLastName">{props.user.lastName}</span>
                </div>
            </div>
        </div>
    );

}
