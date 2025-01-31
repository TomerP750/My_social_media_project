package app.mysocialmedia.Controllers;

import app.mysocialmedia.Beans.Following;
import app.mysocialmedia.Beans.Post;
import app.mysocialmedia.Beans.PostComment;
import app.mysocialmedia.Beans.User;
import app.mysocialmedia.Security.SessionManager;
import app.mysocialmedia.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

   @Autowired
   private SessionManager sessionManager;

    private UserService getInstance(String token) throws SQLException {
        token = token.replace("Bearer ", "");
        UserService userService = sessionManager.getService(token);
        sessionManager.updateSessionExpiration(token);
        return userService;
    }

    @GetMapping("followersCount/{userName}")
    public int followersCount(@RequestHeader(value = "Authorization") String token ,@PathVariable String userName) throws SQLException {
        return getInstance(token).getFollowersCount(userName);
    }

    @GetMapping("followingsCount/{userName}")
    public int followingsCount(@RequestHeader(value = "Authorization") String token ,@PathVariable String userName) throws SQLException {
        return getInstance(token).getFollowingCount(userName);
    }

    @GetMapping("profileByUserName/{userName}")
    public User getProfileByUserName(@RequestHeader(value = "Authorization") String token, @PathVariable String userName) throws SQLException {
        return getInstance(token).getProfileByUserName(userName);
    }

    @GetMapping("userdetails")
    public User getUserDetails(@RequestHeader(value = "Authorization") String token) throws SQLException {
        return getInstance(token).getUserDetails();
    }

    @PutMapping("updateuser")
    public void updateUser(@RequestHeader(value = "Authorization") String token,@RequestBody User user) throws SQLException {
        getInstance(token).updateUser(user);
    }

    @PostMapping("followunfollow/{followedId}")
    public boolean followUser(@RequestHeader(value = "Authorization") String token,@PathVariable long followedId) throws SQLException {
        return getInstance(token).followUnfollow(followedId);
    }

    @GetMapping("followers")
    public List<User> showFollowers(@RequestHeader(value = "Authorization") String token) throws SQLException {
        return getInstance(token).getAllFollowers();
    }

    @GetMapping("followings")
    public List<User> showAllFollowings(@RequestHeader(value = "Authorization") String token,User user) throws SQLException {
        return getInstance(token).getAllFollowings(user);
    }

    // Posts

    @GetMapping("/post/getposts")
    public List<Post> getPosts(@RequestHeader(value = "Authorization") String token) throws SQLException {
        return getInstance(token).getPosts();
    }

    @PostMapping("/post/addpost")
    public Post addPost(@RequestHeader(value = "Authorization") String token,@RequestBody Post post) throws SQLException {
        return getInstance(token).addPost(post);
    }

    @PutMapping("/post/editpost/{postId}/{content}")
    public void editPost(@RequestHeader(value = "Authorization") String token,@PathVariable int postId, @PathVariable String content) throws SQLException {
        getInstance(token).editPost(postId, content);
    }

    @DeleteMapping("/post/deletepost/{postId}")
    public void deletePost(@RequestHeader(value = "Authorization") String token,@PathVariable long postId) throws SQLException {
        getInstance(token).deletePost(postId);
    }

    @PostMapping("/post/likeunlike")
    public boolean likeUnlike(@RequestHeader(value = "Authorization") String token,@RequestBody Post post) throws SQLException {
        return getInstance(token).likeUnlike(post);
    }

    @GetMapping("/post/checkifpostliked/{postId}")
    public boolean checkIfLiked(@RequestHeader(value = "Authorization") String token, @PathVariable long postId) throws SQLException {
        return getInstance(token).checkIfPostLiked(postId);
    }

    @PostMapping("/post/comment")
    public void addComment(@RequestHeader(value = "Authorization") String token,@RequestBody PostComment comment) throws SQLException {
        getInstance(token).commentOnPost(comment);
    }

    @DeleteMapping("/post/deletecomment")
    public void deletePostComment(@RequestHeader(value = "Authorization") String token,PostComment comment) throws SQLException {
        getInstance(token).deletePostComment(comment);
    }


//    TEST AREA

    @PutMapping("/bio/{userId}/{content}")
    public void editAboutBio(@RequestHeader(value = "Authorization") String token, @PathVariable long userId,@PathVariable String content) throws SQLException {
        getInstance(token).editProfileBio(userId, content);
    }

//    TEST AREA


}
