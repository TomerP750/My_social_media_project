import "./FollowingsModal.css";
import {useEffect, useState} from "react";
import userService from "../../../Services/UserService.ts";
import {User} from "../../../Models/User.ts";
import {FollowingsSpan} from "../FollowingsSpan/FollowingsSpan.tsx";
import feedService from "../../../Services/FeedService.ts";
interface FollowingsModalProps {
    onClose: () => void
    user: User
}
export function FollowingsModal(props: FollowingsModalProps): JSX.Element {

    const [followings, setFollowings] = useState<User[]>([]);

    useEffect(() => {
        feedService.getProfileFollowings(props.user.id)
            .then(res => setFollowings(res))
            .catch(err => alert(err.response.data))
    }, []);


    return (
        <div className="FollowingsModal">
            <div className="followings-modal-content">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1>Following</h1>
                <hr className="followingsModalHr"/>
                {followings ? followings.map(following => (
                    <FollowingsSpan
                        user={following} key={following.id}
                        onCloseModal={props.onClose}
                    />
                )) : <span>Loading...</span>}
            </div>
        </div>
    );

}
