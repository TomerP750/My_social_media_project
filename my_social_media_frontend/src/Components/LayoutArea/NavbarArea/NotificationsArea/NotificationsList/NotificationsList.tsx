import "./NotificationsList.css";
import {useEffect, useState} from "react";
import {Notification} from "../../../../../Models/Notification.ts";
import userService from "../../../../../Services/UserService.ts";
import {NotificationCard} from "../NotificationCard/NotificationCard.tsx";

export function NotificationsList(): JSX.Element {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        userService.getAllNotifications()
            .then(res => setNotifications(res))
            .catch(err => err.repsonse.data)
    }, []);



    return (
        <div className="NotificationsList">
            {notifications.length > 0 ? notifications.map(not => <NotificationCard key={not.id} notification={not}/>) : <span>Loading...</span>}
        </div>
    );
}
