package app.mysocialmedia.Repositories;


import app.mysocialmedia.Beans.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikesRepository extends JpaRepository<PostLike, Long> {

    PostLike findByPostIdAndLikerId(long postId, long likeId);
    boolean existsByPostIdAndLikerId(long postId, long likeId);
}
