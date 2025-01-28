import "./Feed.css";
import {useEffect, useState} from "react";
import {StartPosting} from "../PostArea/StartPosting/StartPosting.tsx";
import {authStore} from "../../../Redux/AuthSlice.ts";
import userService from "../../../Services/UserService.ts";
import {User} from "../../../Models/User.ts";
import {Filter} from "../Filter/Filter.tsx";
import {Post} from "../../../Models/Post.ts";
import feedService from "../../../Services/FeedService.ts";
import {PostCard} from "../PostArea/PostCard/PostCard.tsx";

export function Feed(): JSX.Element {
    
    const [user, setUser] = useState<User>();
    const [filter, setFilter] = useState<'Newest' | 'Oldest'>('Newest');
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        feedService.getAllPosts()
            .then(res=>setPosts(res))
            .catch(err=>err.response.data)
    }, []);


    useEffect(() => {
        if (authStore.getState().token) {
            userService.getAccountDetails()
                .then(res => setUser(res))
                .catch(err=>console.log(err))
        }
    }, []);

    function comparePosts(a: Post, b: Post) {
        const dateA = new Date(a.datePosted).getTime();
        const dateB = new Date(b.datePosted).getTime();

        if (filter === 'Newest') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    }

    const sortedPosts = [...posts].sort(comparePosts);

    return (

        <div className="Feed">
            <StartPosting posts={posts} setPosts={setPosts} user={user!}/>
            <div className="filter">
            <Filter setFilter={setFilter}/>
            </div>
            <div className="Posts">
                {sortedPosts ? sortedPosts.map(post => <PostCard post={post} key={post.id}/>) : <p>Loading...</p>}
            </div>
        </div>


    );
}
