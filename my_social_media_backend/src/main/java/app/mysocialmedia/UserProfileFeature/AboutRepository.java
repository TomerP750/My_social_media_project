package app.mysocialmedia.UserProfileFeature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AboutRepository extends JpaRepository<AboutBio, Long> {

//    @Query(value = "SELECT 1 FROM abouts a JOIN users u ON a.user_id = u.id WHERE u.userName = ?1 LIMIT 1", nativeQuery = true)
//    boolean existsByUserName(String userName);

    boolean existsByUserId(long userId);
    AboutBio findByUserId(long userId);

}
