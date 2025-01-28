package app.mysocialmedia.Repositories;

import app.mysocialmedia.Beans.Following;
import app.mysocialmedia.Beans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FollowingRepository extends JpaRepository<Following, Long> {

    boolean existsByFollowerIdAndFollowedId(long followerId, long followedId);

    @Query(value = "SELECT COUNT(*) FROM followings f JOIN users u ON u.id = f.followed_id WHERE u.user_name = ?1", nativeQuery = true)
    int getFollowersCount(String userName);

    @Query(value = "SELECT COUNT(*) FROM followings f JOIN users u ON u.id = f.follower_id WHERE u.user_name = ?1", nativeQuery = true)
    int getFollowingCount(String userName);

    List<Following>findByFollowedId(long followedId);

    List<Following>findByFollowerId(long followerId);

    @Query(value = "SELECT u.* FROM followings f JOIN users u ON u.id = f.follower_id WHERE f.followed_id = ?1", nativeQuery = true)
    List<User>getAllFollowers(long followedId);

    @Query(value = "SELECT u.* FROM followings f JOIN users u ON u.id = f.followed_id WHERE f.follower_id = ?1", nativeQuery = true)
    List<User>getAllFollowings(long followerId);

    Following findByFollowerIdAndFollowedId(long followerId, long followedId);


}
