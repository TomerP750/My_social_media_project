package app.mysocialmedia.Repositories;


import app.mysocialmedia.Beans.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface PostLikesRepository extends JpaRepository<PostLike, Long> {

    PostLike findByPostIdAndLikerId(long postId, long likeId);
    boolean existsByPostIdAndLikerId(long postId, long likeId);

    @Transactional
    @Modifying
    void deleteByPostId(long postId);
}
