package app.mysocialmedia.UserProfileFeature;

import app.mysocialmedia.Beans.UserProfileBio;
import app.mysocialmedia.Exceptions.ExistsException;
import app.mysocialmedia.Repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileBioService {

    private UserProfileBioRepository userProfileBioRepository;
    private UserRepository userRepository;

    public UserProfileBioService(UserProfileBioRepository userProfileBioRepository, UserRepository userRepository) {
        this.userProfileBioRepository = userProfileBioRepository;
        this.userRepository = userRepository;
    }

    /**
     * Gets the object that has the about and the banner strings so i can get them and implement them in the profile
     * @param userId
     * @return
     */
    public UserProfileBio getUserProfileDetails(long userId) {
        if (userProfileBioRepository.existsById(userId)) {
            return userProfileBioRepository.findById(userId).orElseThrow(()-> new ExistsException("User does not exist"));
        } else {
            throw new ExistsException("User not found");
        }
    }


}
