import "./FollowingsModal.css";
import {useEffect, useState} from "react";
import userService from "../../../Services/UserService.ts";
import {User} from "../../../Models/User.ts";
import {FollowingsSpan} from "../FollowingsSpan/FollowingsSpan.tsx";
interface FollowingsModalProps {
    onClose: () => void
    // user: User
}
export function FollowingsModal(props: FollowingsModalProps): JSX.Element {

    const [followings, setFollowings] = useState<User[]>([]);

    useEffect(() => {
        userService.getUserFollowings()
            .then(res => setFollowings(res))
            .catch(err => alert(err.response.data))
    }, []);


    return (
        <div className="FollowingsModal">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={props.onClose}>&times;</span>
                    <h1>Following</h1>
                    {followings ? followings.map(following => <FollowingsSpan
                        user={following}
                        key={following.id}/>)
                        : <span>Loading...</span>}
                </div>
            </div>
        </div>
    );
}
