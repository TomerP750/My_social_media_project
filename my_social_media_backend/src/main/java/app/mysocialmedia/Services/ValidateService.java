package app.mysocialmedia.Services;

import app.mysocialmedia.Beans.User;
import app.mysocialmedia.Exceptions.InvalidInputException;
import app.mysocialmedia.Repositories.UserRepository;
import app.mysocialmedia.Security.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public class ValidateService {

    @Autowired
    private UserRepository userRepository;
    private static SessionManager sessionManager;

    public ValidateService() {
    }

    public void validateCredentials(User user) throws InvalidInputException {
//        String regex = "^[a-zA-Z0-9+&*-]+(?:\\.[a-zA-Z0-9+&-]+)@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new InvalidInputException("Email Already Exists");
        }
        if (userRepository.existsByUserName(user.getUserName())) {
            throw new InvalidInputException("User Name Already Exists");
        }
//        if(!user.getEmail().matches(regex)){
//            throw new InvalidInputException("Invalid Email");
//        }
        if(user.getPassword().length()<6){
            throw new InvalidInputException("Invalid Password , Must be at least 6 characters");
        }

    }
    public boolean login(String email, String password) throws SQLException {
        if (!userRepository.existsByEmailAndPassword(password, email)) {
            throw new SQLException("One of two details provided are mot correct ," +
                    "please try again");
        }
        return true;
    }
    public void register(User user) throws InvalidInputException {
        validateCredentials(user);
        userRepository.save(user);
    }

    public void logout(String token) {
        sessionManager.endSession(token);
    }
}
