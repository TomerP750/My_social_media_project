import "./CommentsOnPost.css";
import {useEffect, useState} from "react";
import {PostComment} from "../../../../Models/PostComment.ts";
import feedService from "../../../../Services/FeedService.ts";
import {Post} from "../../../../Models/Post.ts";
import {PostCommentCard} from "../PostComment/PostCommentCard.tsx";
import {AddComment} from "../AddComment/AddComment.tsx";

interface PostProps {
    post: Post
    postCommentCount: number
    setPostCommentCount: React.Dispatch<React.SetStateAction<number>>;
}
export function CommentsOnPost(props: PostProps): JSX.Element {

    const [postComments, setPostComments] = useState<PostComment[]>([]);

    useEffect(() => {
        feedService.getPostCommentsByPostId(props.post.id)
            .then(res => setPostComments(res))
            .catch(err => err.response.data)
    }, [props.post.id]);

    return (
        <div className="CommentsOnPost">
            <AddComment
                post={props.post}
                setPostComments={setPostComments}
                postCommentCount={props.postCommentCount}
                setPostCommentCount={props.setPostCommentCount}
            />
            {postComments && postComments.map(comment =>
                <PostCommentCard
                    postCommentCount={props.postCommentCount}
                    setPostCommentCount={props.setPostCommentCount}
                    setPostComments={setPostComments}
                    postComments={postComments}
                    key={comment.id}
                    postComment={comment}
                />)}
        </div>
    );

}
