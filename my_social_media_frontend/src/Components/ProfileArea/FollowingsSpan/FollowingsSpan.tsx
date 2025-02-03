import "./FollowingsSpan.css";
import {User} from "../../../Models/User.ts";
import {useNavigate} from "react-router-dom";


interface FollowingsSpanProps {
    user: User
    onCloseModal: () => void
}
export function FollowingsSpan(props: FollowingsSpanProps): JSX.Element {

    const navigate = useNavigate();

    function handleFullNameClick() {
        navigate(`/user/${props.user.userName}`);
        props.onCloseModal();
    }

    return (
        <div className="FollowingsSpan">
            <div className="followingUser">
                <img src="#" alt="Profile" />
                <div className="fullName" onClick={handleFullNameClick}>
                    <span className="followingModalFirstName">{props.user.firstName}</span>
                    <span className="followingModalLastName">{props.user.lastName}</span>
                </div>
            </div>
        </div>
    );

}
