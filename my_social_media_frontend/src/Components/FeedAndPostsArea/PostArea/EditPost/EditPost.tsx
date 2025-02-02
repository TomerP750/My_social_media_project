import "./EditPost.css";
import {useState} from "react";
import {Post} from "../../../../Models/Post.ts";
import userService from "../../../../Services/UserService.ts";

interface EditPostProps {
    post: Post
    onCloseModal: () => void;
    onSaveEdit: (updatedPost: Post) => void
}
export function EditPost(props: EditPostProps): JSX.Element {

    const [content, setContent] = useState<string>(props.post.content);

    function handleContentWrite(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
    }


    function handleSaveEdit() {
        // userService.editPost(props.post.id, content)
        //     .then((res) => {
        //         const updatedPost = { ...props.post, content };
        //         props.onSaveEdit(updatedPost);
        //     })
        //     .catch((error) => {
        //         console.error("Failed to save post edit:", error);
        //     });
        // props.onCloseModal();
        userService
            .editPost(props.post.id, content)
            .then((res) => {
                console.log("res: " ,res)
                console.log("props.post: " , props.post)
                const updatedPost = { ...props.post, content, edited: true };
                props.onSaveEdit(updatedPost);

            })
            .catch((error) => {
                console.error("Failed to save post edit:", error);
            });
        props.onCloseModal();
    }

    return (
        <div className="EditPost">
            <div className="modal">
                <div className="modal-content">
                    <h2>Edit Post</h2>
                    <textarea
                        value={content}
                        className="edit-textarea"
                        rows={6}
                        placeholder="Edit your post content here..."
                        onChange={handleContentWrite}
                    ></textarea>

                    <div className="modal-actions">
                        <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                        <button className="cancel-btn" onClick={props.onCloseModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
