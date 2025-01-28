package app.mysocialmedia.Controllers;

import app.mysocialmedia.Beans.User;
import app.mysocialmedia.Exceptions.InvalidInputException;
import app.mysocialmedia.Security.Session;
import app.mysocialmedia.Security.SessionManager;
import app.mysocialmedia.Security.TokenManager;
import app.mysocialmedia.Services.UserService;
import app.mysocialmedia.Services.ValidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private SessionManager sessionManager;
    @Autowired
    ApplicationContext ctx;
    @Autowired
    private ValidateService validateService;

    @GetMapping("login/{email}/{password}")
    public String login(@PathVariable String email,@PathVariable String password) throws SQLException {
        UserService userService = ctx.getBean(UserService.class);
        userService.login(email, password);
        return getNewTokenOrExistingOne(email, password, userService);
    }


    @GetMapping("newToken")
    public String getNewTokenOrExistingOne(String email, String password, UserService userService) throws SQLException {
        String id = email + password;
        String token = "";
        if (sessionManager.checkIfSessionAlreadyExist(id).equals("new")) {
            token = TokenManager.createToken(userService);
            sessionManager.addSession(token, new Session(userService, TokenManager.setExpiredInMinutes(30), id));
        } else {
            token = sessionManager.checkIfSessionAlreadyExist(id);
        }
        return token;
    }


    //TODO maybe change it to String so it gives the token
    @PostMapping("register")
    public void register(@RequestBody User user) throws InvalidInputException, SQLException {
        validateService.register(user);
    }

    @PostMapping("/logout")
    public void logout(String token) {
        sessionManager.endSession(token);
    }

}