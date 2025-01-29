package app.mysocialmedia.Repositories;

import app.mysocialmedia.Beans.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
    List<PostComment> findByCommentAuthorId(long authorId);
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM post_comments WHERE post_id = ?1", nativeQuery = true)
    void deleteCommentsByPostId(long postId);
    @Query(value = "SELECT COUNT(*) FROM post_comments WHERE post_id = ?1;", nativeQuery = true)
    int getCommentCountByPostId(long postId);

    List<PostComment> findByPostId(long postId);

}
