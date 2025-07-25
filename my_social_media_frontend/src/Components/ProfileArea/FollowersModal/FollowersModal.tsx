import "./FollowersModal.css";
import {useEffect, useState} from "react";
import {User} from "../../../Models/User.ts";
import userService from "../../../Services/UserService.ts";
import {FollowersSpan} from "../FollowersSpan/FollowersSpan.tsx";
import feedService from "../../../Services/FeedService.ts";

interface FollowersModalProps {
    onClose: () => void
    user: User
}

export function FollowersModal(props: FollowersModalProps): JSX.Element {

    const [followers, setFollowers] = useState<User[]>([]);

    useEffect(() => {
        feedService.getProfileFollowers(props.user.id)
            .then(res => setFollowers(res))
            .catch(err => alert(err.response.data))
    }, []);

    return (
        <div className="FollowersModal">
            <div className="followers-modal-content">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1>Followers</h1>
                <hr className="followersModalHr"/>
                {followers ? followers.map(follower => <FollowersSpan
                    onCloseModal={props.onClose}
                    user={follower}
                    key={follower.id}/>) : <span>Loading...</span>}
            </div>
        </div>
    );


}
