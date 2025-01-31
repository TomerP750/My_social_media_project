package app.mysocialmedia.UserProfileFeature;

import app.mysocialmedia.Beans.UserProfileDetails;
import app.mysocialmedia.Security.SessionManager;
import app.mysocialmedia.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequestMapping("bio")
public class UserProfileDetailsController {
    private UserProfileService userProfileService;

    public UserProfileDetailsController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("details/{userId}")
    public UserProfileDetails getUserProfileDetails(@PathVariable long userId) {
        return userProfileService.getUserProfileDetails(userId);
    }


}
