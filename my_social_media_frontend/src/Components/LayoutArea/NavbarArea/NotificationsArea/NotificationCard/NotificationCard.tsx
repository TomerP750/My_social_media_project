import "./NotificationCard.css";
import {Notification} from "../../../../../Models/Notification.ts";
import {useEffect, useState} from "react";
import {timeAgo} from "../../../../../Util.ts";


interface NotificationCardProps {
    notification: Notification
}
export function NotificationCard(props: NotificationCardProps): JSX.Element {

    const [timeAgoText, setTimeAgoText] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            setTimeAgoText(timeAgo(props.notification.dateNotified));
        };

        updateTime(); // Initial update
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, [props.notification.dateNotified]);

    return (
        <div className="NotificationCard">
            {/*<img src={} alt=""/>*/}
            <div className="notDetails">
                <div className="notDetailsTop">
                    <span className={"notiDate"}>{timeAgoText}</span>
                </div>
                <div className="notDetailsBottom">
                    <img src={props.notification.user.image} alt="."/>
                    <span className="notContent">{props.notification.content}</span>
                </div>
            </div>
        </div>
    );
}
