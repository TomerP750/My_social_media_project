package app.mysocialmedia.Services;

import app.mysocialmedia.Beans.Following;
import app.mysocialmedia.Beans.Post;
import app.mysocialmedia.Beans.User;
import app.mysocialmedia.Repositories.FollowingRepository;
import app.mysocialmedia.Repositories.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Service
public class FeedService {
    private PostRepository postRepository;
    private FollowingRepository followingRepository;

    public FeedService(PostRepository postRepository, FollowingRepository followingRepository) {
        this.postRepository = postRepository;
        this.followingRepository = followingRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }




}
