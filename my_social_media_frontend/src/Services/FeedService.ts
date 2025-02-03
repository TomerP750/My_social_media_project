import axios from "axios";


class FeedService {

    async getAllPosts() {
        return (await axios.get("http://localhost:8080/feed/all")).data
    }

    async getAllPostsByFollowing() {

    }

    async getCommentCountByPostId(id: number) {
        return (await axios.get(`http://localhost:8080/feed/commentcountbyid/${id}`)).data
    }

    async getPostCommentsByPostId(postId: number) {
        return (await axios.get(`http://localhost:8080/feed/postcomments/${postId}`)).data
    }

    async getProfileFollowers(id: number) {
        return (await axios.get(`http://localhost:8080/feed/followers/${id}`)).data
    }

    async getProfileFollowings(id: number) {
        return (await axios.get(`http://localhost:8080/feed/followings/${id}`)).data
    }


}


const feedService = new FeedService();
export default feedService;


