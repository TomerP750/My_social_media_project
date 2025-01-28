import "./CommentsOnPost.css";
import {useEffect, useState} from "react";
import {PostComment} from "../../../../Models/PostComment.ts";
import feedService from "../../../../Services/FeedService.ts";
import {Post} from "../../../../Models/Post.ts";
import {PostCommentCard} from "../PostComment/PostCommentCard.tsx";
import {AddComment} from "../AddComment/AddComment.tsx";

interface PostProps {
    post: Post
}
export function CommentsOnPost(props: PostProps): JSX.Element {

    const [postComments, setPostComments] = useState<PostComment[]>([]);

    useEffect(() => {
        feedService.getPostCommentsByPostId(props.post.id)
            .then(res => setPostComments(res))
            .catch(err => err.response.data)
    }, []);

    return (
        <div className="CommentsOnPost">
            <AddComment post={props.post} setPostComments={setPostComments}/>
            {postComments && postComments.map(comment => <PostCommentCard key={comment.id} postComment={comment}/>)}
        </div>
    );
}
