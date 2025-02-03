package app.mysocialmedia.Controllers;

import app.mysocialmedia.Beans.*;
import app.mysocialmedia.Security.SessionManager;
import app.mysocialmedia.Services.UserService;
import app.mysocialmedia.UserProfileFeature.AboutBio;
import app.mysocialmedia.UserProfileFeature.ProfileBanner;
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
    public List<User> showAllFollowings(@RequestHeader(value = "Authorization") String token) throws SQLException {
        return getInstance(token).getAllFollowings();
    }

    @GetMapping("isFollowing/{followerId}/{followedId}")
    public boolean isUserFollowed(@RequestHeader(value = "Authorization") String token ,@PathVariable long followerId,@PathVariable long followedId) throws SQLException {
        return getInstance(token).isUserFollowed(followerId, followedId);
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
// maybe return back to void
    @PutMapping("/post/editpost/{postId}/{content}")
    public boolean editPost(@RequestHeader(value = "Authorization") String token,@PathVariable int postId, @PathVariable String content) throws SQLException {
        return getInstance(token).editPost(postId, content);
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
    public PostComment addComment(@RequestHeader(value = "Authorization") String token,@RequestBody PostComment comment) throws SQLException {
        return getInstance(token).commentOnPost(comment);
    }

    @DeleteMapping("/post/deletecomment/{postCommentId}")
    public void deletePostComment(@RequestHeader(value = "Authorization") String token,@PathVariable long postCommentId) throws SQLException {
        getInstance(token).deletePostComment(postCommentId);
    }


//    TEST AREA

    @PutMapping("/editAboutBio")
    public void editAboutBio(@RequestHeader(value = "Authorization") String token, @RequestBody AboutBio aboutBio) throws SQLException {
        getInstance(token).editAboutBio(aboutBio);
    }

    @GetMapping("/getAbout/{userId}")
    public AboutBio getAbout(@RequestHeader(value = "Authorization") String token, @PathVariable long userId) throws SQLException {
        return getInstance(token).getAboutBio(userId);
    }

    @PutMapping("/editBanner/{banner}")
    public void editBanner(@RequestHeader(value = "Authorization") String token, @RequestBody ProfileBanner banner) throws SQLException {
        getInstance(token).editeBanner(banner);
    }

//    TEST AREA

    @GetMapping("search/{query}")
    public List<User> searchUsers(@RequestHeader(value = "Authorization") String token, @PathVariable String query) throws SQLException {
        return getInstance(token).searchUsers(query);
    }


}
