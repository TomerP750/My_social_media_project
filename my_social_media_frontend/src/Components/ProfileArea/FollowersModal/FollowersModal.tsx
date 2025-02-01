import "./FollowersModal.css";
import {useEffect, useState} from "react";
import {User} from "../../../Models/User.ts";
import userService from "../../../Services/UserService.ts";
import {FollowersSpan} from "../FollowersSpan/FollowersSpan.tsx";


interface FollowersModalProps {
    onClose: () => void
    // user: User
}

export function FollowersModal(props: FollowersModalProps): JSX.Element {

    const [followers, setFollowers] = useState<User[]>([]);

    useEffect(() => {
        userService.getUserFollowers()
            .then(res => setFollowers(res))
            .catch(err => alert(err.response.data))
    }, []);


    return (
        <div className="FollowersModal">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={props.onClose}>&times;</span>
                    <h1>Followers</h1>
                    {followers ? followers.map(follower => <FollowersSpan
                            user={follower}
                            key={follower.id}/>) : <span>Loading...</span>}
                </div>
            </div>
        </div>
    );
}
