import axios from "axios";
import {Post} from "../Models/Post.ts";
import {User} from "../Models/User.ts";
import {PostComment} from "../Models/PostComment.ts";
import {AboutBio} from "../Models/AboutBio.ts";


class UserService {
    async getAccountDetails() {
        return (await(axios.get("http://localhost:8080/user/userdetails"))).data;
    }

    async getProfileByUserName(userName: string) {
        return (await axios.get(`http://localhost:8080/user/profileByUserName/${userName}`)).data;
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

    async editPost(postId: number, content: string) {
        return (await axios.put(`http://localhost:8080/user/post/editpost/${postId}/${content}`)).data;
    }

    async deletePost(postId: number) {
        return (axios.delete(`http://localhost:8080/user/post/deletepost/${postId}`));
    }


    async likeUnlike(post: Post) {
        return (await axios.post("http://localhost:8080/user/post/likeunlike", post)).data;
    }

    async addComment(postComment: PostComment) {
        return(await axios.post("http://localhost:8080/user/post/comment", postComment)).data;
    }

    async deleteComment(postCommentId: number) {
        return (await axios.delete(`http://localhost:8080/user/post/deletecomment/${postCommentId}`));
    }

    async checkIfPostLiked(postId: number) {
        return (await axios.get(`http://localhost:8080/user/post/checkifpostliked/${postId}`)).data;
    }

    async isUserFollowed(followerId: number, followedId: number) {
        return (await axios.get(`http://localhost:8080/user/isFollowing/${followerId}/${followedId}`)).data
    }

//     TEST SECTION FOR USERPROFILEDETAILS - REMOVE THIS IF I DONT WANT TO WORK WITH IT ANYMORE

    async getUserProfileDetailsByUserId(userId: number) {
        return (await axios.get(`http://localhost:8080/user/bio/${userId}`)).data
    }

    async editAboutBio(about: AboutBio) {
        return (await axios.put(`http://localhost:8080/user/editAboutBio`, about))
    }

    async getAboutByUserId(userId: number) {
        return (await axios.get(`http://localhost:8080/user/getAbout/${userId}`)).data
    }

    async searchUsers(query: string) {
        return (await axios.get(`http://localhost:8080/user/search/${query}`)).data
    }

//     TEST FIELD BOTTOM

}


const userService = new UserService();
export default userService;
