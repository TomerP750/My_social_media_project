import "./Feed.css";
import {useEffect, useState} from "react";
import {StartPosting} from "../PostArea/StartPosting/StartPosting.tsx";
import {authStore} from "../../../Redux/AuthSlice.ts";
import userService from "../../../Services/UserService.ts";
import {User} from "../../../Models/User.ts";
import {Filter} from "../Filter/Filter.tsx";
import {Post} from "../../../Models/Post.ts";
import feedService from "../../../Services/FeedService.ts";
import {PostCard} from "../PostArea/PostCardArea/PostCard/PostCard.tsx";

export function Feed(): JSX.Element {
    
    const [user, setUser] = useState<User>();
    const [filter, setFilter] = useState<'Newest' | 'Oldest'>('Newest');
    const [posts, setPosts] = useState<Post[]>([]);


    useEffect(() => {
        feedService.getAllPosts()
            .then(res=>{
                console.log("posts: ", res)
                setPosts(res)
            })
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

    function handlePostDeletion(postId: number) {
        userService.deletePost(postId)
            .then(() => setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))  )
            .catch(err => err.response.data)
    }
    function handlePostEdit(updatedPost: Post) {
        console.log("updated post: ",updatedPost)
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === updatedPost.id ? updatedPost : post
            )
        );
    }


    return (

        <div className="Feed">
            <StartPosting posts={posts} setPosts={setPosts} user={user!}/>
            <div className="filter">
            <Filter setFilter={setFilter}/>
            </div>
            <div className="Posts">
                {sortedPosts ? sortedPosts.map(post =>
                    <PostCard
                        setPosts={setPosts}
                    user={post.author}
                    onDelete={handlePostDeletion}
                    onEdit={handlePostEdit}
                    post={post} key={post.id}/>) : <p>Loading...</p>}
            </div>
        </div>


    );
}
