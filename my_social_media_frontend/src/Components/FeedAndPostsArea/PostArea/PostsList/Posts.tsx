import "./Posts.css";
// import {useEffect, useState} from "react";
// import {Post} from "../../../../Models/Post.ts";
// import feedService from "../../../../Services/FeedService.ts";
// import {PostCard} from "../PostCard/PostCard.tsx";

export function Posts(): JSX.Element {

    // const [posts, setPosts] = useState<Post[]>([]);
    //
    // useEffect(() => {
    //     feedService.getAllPosts()
    //         .then(res=>setPosts(res))
    //         .catch(err=>err.response.data)
    // }, []);


    return (
        <div className="Posts">
            {/*{posts? posts.map(post=><PostCard post={post} key={post.id}/>) : <p>Loading...</p>}*/}
        </div>
    );
}
