package app.mysocialmedia.Services;

import app.mysocialmedia.Beans.PostComment;
import app.mysocialmedia.Exceptions.ExistsException;
import app.mysocialmedia.Repositories.PostCommentRepository;
import app.mysocialmedia.Repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private PostRepository postRepository;
    private PostCommentRepository postCommentRepository;

    public PostService(PostRepository postRepository, PostCommentRepository postCommentRepository) {
        this.postRepository = postRepository;
        this.postCommentRepository = postCommentRepository;
    }
    public int getPostCommentCountByPostId(long id) {
        return postCommentRepository.getCommentCountByPostId(id);
    }

    public List<PostComment> getPostCommentsByPostId(long id) {
        if (postRepository.existsById(id)) {
            return postCommentRepository.findByPostId(id);
        } else {
            throw new ExistsException("Post does not exist");
        }
    }
}
