package app.mysocialmedia.Security;
import app.mysocialmedia.Services.UserService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Scope("prototype")
public class Session {
    private UserService userService;
    private Date expirationDate;
    private String userId;

    public Session(UserService userService, Date expirationDate, String userId) {
        this.userService = userService;
        this.expirationDate = expirationDate;
        this.userId = userId;
    }

    public UserService getUserService() {
        return userService;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}