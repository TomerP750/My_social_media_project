package app.mysocialmedia.UserProfileFeature;

import app.mysocialmedia.Beans.UserProfileBio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileBioRepository extends JpaRepository<UserProfileBio, Long> {

    boolean existsByUserId(long userId);
    UserProfileBio findByUserId(long userId);



}
