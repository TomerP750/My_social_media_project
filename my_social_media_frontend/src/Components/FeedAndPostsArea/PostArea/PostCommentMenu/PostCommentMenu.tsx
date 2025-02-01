import "./PostCommentMenu.css";
import {PostComment} from "../../../../Models/PostComment.ts";

interface PostCommentMenuProps {
    postComment: PostComment
    onDelete: (postCommentId: number) => void
}
export function PostCommentMenu(props: PostCommentMenuProps): JSX.Element {

    function handleChangeSelect(val: string) {

        if(val === "delete") {
            const deleteSure = window.confirm("Are you sure you want to delete?")
            if (deleteSure) {
                props.onDelete(props.postComment.id);
            }

        }
        if (val === "edit") {

        }
    }

    return (
        <div className="PostCommentMenu">
            <div className="postOptionsDropdown">
                <div className="postOptionItem" onClick={() => handleChangeSelect("edit")}>Edit</div>
                <div className="postOptionItem" onClick={() => handleChangeSelect("delete")}>Delete</div>
            </div>
        </div>
    );
}
