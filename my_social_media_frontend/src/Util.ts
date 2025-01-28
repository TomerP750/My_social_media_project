import {User} from "./Models/User.ts";
import {authStore} from "./Redux/AuthSlice.ts";
import defaultProfilePic from "../src/assets/defaultProfilepic.png"

export function timeAgo(date: Date) {
    const now = new Date();
    const past = new Date(date);

    // Check if the passed date is invalid
    if (isNaN(past.getTime())) {
        return 'Invalid date'; // Or return some other fallback message
    }

    const diffInMilliseconds: number = now.getTime() - past.getTime();
    const diffInSeconds: number = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes: number = Math.floor(diffInSeconds / 60);
    const diffInHours: number = Math.floor(diffInMinutes / 60);
    const diffInDays: number = Math.floor(diffInHours / 24);
    const diffInMonths: number = Math.floor(diffInDays / 30);
    const diffInYears: number = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
    } else {
        return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
    }
}


export function defaultProfilePicture(user: User) {
    if (authStore.getState().token && user.image == null) {
        user.image = defaultProfilePic
    }
}


export function getTokenState(): boolean {
    if (authStore.getState().token) {
        return true;
    }
    return false;
}
