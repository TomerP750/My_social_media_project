package app.mysocialmedia.UserProfileFeature;

import app.mysocialmedia.Beans.UserProfileDetails;
import app.mysocialmedia.Exceptions.ExistsException;
import app.mysocialmedia.Repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private UserProfileRepository userProfileRepository;
    private UserRepository userRepository;

    public UserProfileService(UserProfileRepository userProfileRepository, UserRepository userRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
    }

    /**
     * Gets the object that has the about and the banner strings so i can get them and implement them in the profile
     * @param userId
     * @return
     */
    public UserProfileDetails getUserProfileDetails(long userId) {
        if (userProfileRepository.existsById(userId)) {
            return userProfileRepository.findById(userId).orElseThrow(()-> new ExistsException("User does not exist"));
        } else {
            throw new ExistsException("User not found");
        }
    }


}
