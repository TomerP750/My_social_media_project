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
        console.log("post id: " + postId);
        return (await axios.get(`http://localhost:8080/feed/postcomments/${postId}`)).data
    }
}


const feedService = new FeedService();
export default feedService;


