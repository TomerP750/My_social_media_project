package app.mysocialmedia.Security;

import app.mysocialmedia.Services.UserService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Component
public class SessionManager {
    private HashMap<String, Session> sessions = new HashMap<>();

    public SessionManager(HashMap<String, Session> sessions) {
        this.sessions = sessions;
    }

    public String checkIfSessionAlreadyExist(String userId) {
        for (String t : sessions.keySet()) {
            if (sessions.get(t).getUserId() != null) {
                if (sessions.get(t).getUserId().equals(userId)) {
                    return t;
                }
            }
        }
        return "new";
    }

    public void addSession(String token, Session session) {
        sessions.put(token, session);
    }

    public void endSession(String token) {
        sessions.remove(token);
    }

    public boolean checkIfKeyExists(String token) {
        return sessions.containsKey(token);
    }

    public UserService getService(String token) throws SQLException {
        if (checkIfKeyExists(token)) {
            return sessions.get(token).getUserService();
        } else {
            throw new SQLException("Session is over please login again");
        }
    }

    public boolean checkIfSessionExpired(String token) {
        if (checkIfKeyExists(token)) {
            if (sessions.get(token).getExpirationDate().before(new Date(System.currentTimeMillis()))) {
                return true;
            }
        }
        return false;
    }

    public void updateSessionExpiration(String token) throws SQLException {
        if (checkIfKeyExists(token)) {
            if (!checkIfSessionExpired(token)) {
                sessions.get(token).setExpirationDate(TokenManager.setExpiredInMinutes(30));
            } else throw new SQLException("Sorry the session is over, please log in again");
        }
    }

    @Scheduled(fixedRate = 30 * 1000)
    public void removeExpiredSessions() {
        List<String> expTokens = new ArrayList<>();
        for (String t : sessions.keySet()) {
            if (checkIfSessionExpired(t)) {
                expTokens.add(t);
            }
        }
        for (String exp : expTokens) {
            endSession(exp);
        }
    }

}