package app.mysocialmedia.Controllers;

import app.mysocialmedia.Beans.Post;
import app.mysocialmedia.Beans.PostComment;
import app.mysocialmedia.Beans.User;
import app.mysocialmedia.Security.SessionManager;
import app.mysocialmedia.Services.FeedService;
import app.mysocialmedia.Services.PostService;
import app.mysocialmedia.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/feed")
public class FeedController {

    @Autowired
    private PostService postService;
    private FeedService feedService;

    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @GetMapping("all")
    public List<Post> getAllPosts() {
        return feedService.getAllPosts();
    }

    @GetMapping("commentcountbyid/{id}")
    public int getCommentCountByPostId(@PathVariable long id) {
        return postService.getPostCommentCountByPostId(id);
    }

    @GetMapping("postcomments/{postId}")
    public List<PostComment> getPostCommentsByPostId(@PathVariable long postId) {
        return postService.getPostCommentsByPostId(postId);
    }


}
