package app.mysocialmedia.Repositories;

import app.mysocialmedia.Beans.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {


    List<Post>findByAuthor_id(Long id);

    @Query(value = "SELECT * FROM posts p JOIN followings f ON f.followed_id = p.author_id WHERE follower_id = ?1 and followed_id = ?2" ,nativeQuery = true)
    List<Post>getAllFollowingPosts(long followedId);







}
