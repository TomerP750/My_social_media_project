package app.mysocialmedia.Services;

import app.mysocialmedia.Beans.*;
import app.mysocialmedia.Exceptions.ExistsException;
import app.mysocialmedia.Exceptions.InvalidInputException;
import app.mysocialmedia.Exceptions.NotLoggedInException;
import app.mysocialmedia.Repositories.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
@Scope("prototype")
public class UserService {
    private PostCommentRepository postCommentRepository;
    private boolean isLoggedIn = false;
    private User user;
    private FollowingRepository followingRepository;
    private UserRepository userRepository;
    private PostRepository postRepository;
    private PostLikesRepository postLikesRepository;


    public UserService(FollowingRepository followingRepository, UserRepository userRepository, PostRepository postRepository, PostLikesRepository postLikesRepository, PostCommentRepository postCommentRepository) {
        this.followingRepository = followingRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.postLikesRepository = postLikesRepository;
        this.postCommentRepository = postCommentRepository;
    }
    public void login(String email, String password) {
        if (userRepository.existsByEmailAndPassword(email, password)) {
            isLoggedIn = true;
            user = userRepository.findByEmail(email);
        } else {
            throw new NotLoggedInException("Failed To Login");
        }
    }

    public List<Post> getPosts() {
        if (isLoggedIn) {
            return postRepository.findByAuthor_id(user.getId());
        } else {
            throw new NotLoggedInException("Please Login");
        }
    }
    public User getUserDetails() {
        if (isLoggedIn) {
            return user;
        } else {
            throw new NotLoggedInException("Please Login");
        }
    }

    public void updateUser(User user) {
        User userFromDB = userRepository.findById(user.getId()).orElseThrow(()->new ExistsException("User Not Found"));
        if (isLoggedIn) {

            if (userRepository.existsByEmail(user.getEmail())) {
                throw new ExistsException("Email Already Exists");
            }
            if (userRepository.existsByUserName(user.getUserName())) {
                throw new ExistsException("UserName Already Exists");
            }

            if (user.getPassword().length() > 6) {
                throw new InvalidInputException("Password Too Long");
            }

            if (user.getFirstName().isEmpty()) {
                user.setFirstName(userFromDB.getFirstName());
            }
            if (user.getLastName().isEmpty()) {
                user.setLastName(userFromDB.getLastName());
            }
            if (user.getEmail().isEmpty()) {
                user.setEmail(userFromDB.getEmail());
            }
            if (user.getPassword().isEmpty()) {
                user.setPassword(userFromDB.getPassword());
            }
            if (user.getUserName().isEmpty()) {
                user.setUserName(userFromDB.getUserName());
            }
            if (user.getImage().isEmpty()) {
                user.setImage(userFromDB.getImage());
            }
            userRepository.save(user);

        } else {
            throw new NotLoggedInException("Please Login");
        }
    }

    public Post addPost(Post post) {
        if (isLoggedIn) {
            if(post.getContent().length() > 1000) {
                throw new InvalidInputException("Reached Maximum Characters");
            }
            if (post.getAuthor().getId() != user.getId()) {
                throw new NotLoggedInException("Please Login");
            }
//            Date now = new java.util.Date();
//            post.setDatePosted(new Date(System.currentTimeMillis()));
            return postRepository.save(post);
        } else {
            throw new NotLoggedInException("Please Login");
        }
    }

    public void editPost(long id, String content) {
        Post postFromDB = postRepository.findById(id).orElseThrow(()->new ExistsException("Post Not Found"));
        if (isLoggedIn) {
            if(postFromDB.getContent().length() > 1000) {
                throw new InvalidInputException("Reached Maximum Characters");
            }
            if (postFromDB.getAuthor().getId() != user.getId()) {
                throw new NotLoggedInException("Please Login");
            }
            postFromDB.setContent(content);
            postRepository.save(postFromDB);
        } else {
            throw new NotLoggedInException("Please Login");
        }
    }

    public void deletePost(long id) {
        Post postFromDb = postRepository.findById(id).orElseThrow(()->new ExistsException("Post Not Found"));
        if (isLoggedIn) {
            if (postFromDb.getAuthor().getId() == user.getId()) {
                postCommentRepository.deleteById(id);
                postRepository.deleteById(id);
            } else {
                throw new ExistsException("Post Not Found");
            }
        }
    }

    //TODO check likePost and checkiflikeed one of them not needed
    public boolean likeUnlike(Post post) {
        if (isLoggedIn) {
            Post postFromDb = postRepository.findById(post.getId()).orElseThrow(()->new ExistsException("Post Not Found"));
            PostLike postLike = postLikesRepository.findByPostIdAndLikerId(post.getId(), user.getId());
            if (postLike != null) {
                postFromDb.setLikeCount(postFromDb.getLikeCount() - 1);
                postRepository.save(postFromDb);
                postLikesRepository.deleteById(postLike.getId());
                return false;
                } else {
                    postFromDb.setLikeCount(post.getLikeCount() + 1);
                    postRepository.save(postFromDb);
                    postLikesRepository.save(new PostLike(post, user));
                    return true;
                }
        } else {
            throw new NotLoggedInException("Please Login");
        }

    }

    /*For Render Purposes*/
    public boolean checkIfPostLiked(long postId) {
        boolean found;
        if (isLoggedIn) {
            Post postFromDb = postRepository.findById(postId).orElseThrow(()->new ExistsException("Post Not Found"));
            if (postLikesRepository.existsByPostIdAndLikerId(postFromDb.getId(), user.getId())) {
                found = true;
            } else {
                found = false;
            }
        } else {
            throw new NotLoggedInException("Please Login");
        }
        return found;
    }

    public void commentOnPost(PostComment postComment) {
        if (isLoggedIn) {
            Post postFromDb = postRepository.findById(postComment.getPost().getId()).orElseThrow(()->new ExistsException("Post Not Found"));
            if (postComment.getMessage().length() > 1000) {
                throw new InvalidInputException("Reached Maximum Characters");
            } else {
                postComment.setCommentAuthor(user);
                postCommentRepository.save(postComment);
            }
        }
    }
    public void deletePostComment(PostComment postComment) {
        if (isLoggedIn) {
            PostComment postCommentFromDb = postCommentRepository.findById(postComment.getId()).orElseThrow(()->new ExistsException("Post Not Found"));
            if (postCommentFromDb.getCommentAuthor().getId() == user.getId()) {
                postCommentRepository.deleteById(postComment.getId());
            } else {
                throw new NotLoggedInException("Please Login");
            }
        } else {
            throw new NotLoggedInException("Please Login");
        }
    }
    public boolean followUnfollow(long followed) throws SQLException {
        User toBeFollowed = userRepository.findById(followed).orElseThrow(() -> new SecurityException("Error"));
        Following following = new Following(user, toBeFollowed);
        boolean followingUser = false;
        if (isLoggedIn) {
            Following temp = followingRepository.findByFollowerIdAndFollowedId(user.getId(), following.getFollowd().getId());
            if (following.getFollower().getId() == user.getId()) {
                if (temp != null) {
                    followingRepository.deleteById(temp.getId());
                } else {
                    followingRepository.save(following);
                    followingUser = true;
                }
            }
        } else {
            throw new NotLoggedInException("Please Login");
        }
        return followingUser;
    }
    public List<User> getAllFollowers() {
        if (isLoggedIn) {
            return followingRepository.getAllFollowers(user.getId());
        } else {
            return null;
        }
    }
    public List<User> getAllFollowings(User user) {
        if (isLoggedIn) {
            return followingRepository.getAllFollowings(user.getId());
        } else {
            return null;
        }
    }

    public User getProfileByUserName(String userName) {
        if (isLoggedIn) {
            return userRepository.findByUserName(userName);
        } else {
            throw new ExistsException("User not Found");
        }
    }

    public int getFollowersCount(String userName) {
        if (isLoggedIn) {
            return followingRepository.getFollowersCount(userName);
        } else {
            throw new NotLoggedInException("Not Logged In ");
        }
    }

    public int getFollowingCount(String userName) {
        if (isLoggedIn) {
            return followingRepository.getFollowingCount(userName);
        } else {
            throw new NotLoggedInException("Not Logged In");
        }
    }

}
