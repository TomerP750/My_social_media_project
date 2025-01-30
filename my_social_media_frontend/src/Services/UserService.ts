import axios from "axios";
import {Post} from "../Models/Post.ts";
import {User} from "../Models/User.ts";
import {PostComment} from "../Models/PostComment.ts";


class UserService {
    async getAccountDetails() {
        return (await(axios.get("http://localhost:8080/user/userdetails"))).data;
    }

    async getProfileByUserName(userName: string) {
        return (await axios.get(`http://localhost:8080/user/profileByUserName/${userName}`)).data;
    }

    async getFollowersCount(userName: string) {
        return (await axios.get(`http://localhost:8080/user/followersCount/${userName}`)).data
    }

    async getFollowingsCount(userName: string) {
        return (await axios.get(`http://localhost:8080/user/followingsCount/${userName}`)).data
    }

    async updateUser(user: User) {
        return (await axios.put("http://localhost:8080/user/updateuser", user));
    }

    async followUnfollowUser(followedId: number) {
        return (await axios.post(`http://localhost:8080/user/followunfollow/${followedId}`)).data;
    }

    async getUserFollowers() {
        return (await axios.get("http://localhost:8080/user/followers")).data;
    }

    async getUserFollowings() {
        return (await axios.get("http://localhost:8080/user/followings")).data;
    }

    async addPost(post: Post) {
        return (await axios.post<Post>("http://localhost:8080/user/post/addpost", post)).data;
    }

    async editPost(postId: number) {
        return (await axios.put(`http://localhost:8080/user/post/editpost/${postId}`));
    }

    async deletePost(postId: number) {
        return (axios.delete(`http://localhost:8080/user/post/deletepost/${postId}`));
    }


    async likeUnlike(post: Post) {
        return (await axios.post("http://localhost:8080/user/post/likeunlike", post)).data;
    }

    async addComment(postComment: PostComment) {
        return(await axios.post("http://localhost:8080/user/post/comment", postComment));
    }

    // async deleteComment(postComment: PostCommentCard) {
    //     return (await axios.delete("http://localhost:8080/user/post/deletecomment", postComment));
    // }

    async checkIfPostLiked(postId: number) {
        return (await axios.get(`http://localhost:8080/user/post/checkifpostliked/${postId}`)).data;
    }

}


const userService = new UserService();
export default userService;
