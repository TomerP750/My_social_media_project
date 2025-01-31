package app.mysocialmedia.UserProfileFeature;

import app.mysocialmedia.Beans.UserProfileDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfileDetails, Long> {

    boolean existsByUserId(long userId);
    UserProfileDetails findByUserId(long userId);



}
