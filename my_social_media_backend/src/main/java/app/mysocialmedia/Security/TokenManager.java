package app.mysocialmedia.Security;


import app.mysocialmedia.Services.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.SQLException;
import java.util.Map;

@Component
public class TokenManager {
    public static String createToken(UserService userService) throws SQLException {
        return JWT.create().withIssuer("PostLikers")
                .withHeader(Map.of("Authorization", "Bearer"))
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withClaim("userName", userService.getUserDetails().getUserName())
                .withClaim("firstName", userService.getUserDetails().getFirstName())
                .withClaim("lastName", userService.getUserDetails().getLastName())
                .withExpiresAt(setExpiredInMinutes(30))
                .sign(Algorithm.none());
    }

    public static Date setExpiredInMinutes(int minutes) {
        long currentTimeMillis = System.currentTimeMillis();
        long expirationTimeMillis = currentTimeMillis + (minutes * 60 * 1000);
        return new Date(expirationTimeMillis);
    }

    
}