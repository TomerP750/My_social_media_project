package app.mysocialmedia.NotificationsFeature;

import app.mysocialmedia.Beans.User;
import app.mysocialmedia.Exceptions.ExistsException;
import app.mysocialmedia.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class NotificationService {

    public NotificationRepository notificationRepository;
    public UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }


    public List<Notification> getAllNotifications(long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public int getNotificationCount(long userId) {
        if (userRepository.existsById(userId)) {
            return notificationRepository.getNotificationCount(userId);
        } else {
            throw new ExistsException("User not found");
        }
    }

    public void addNotification(String notificationType, String content, User userToGetNotified) {
        switch (notificationType) {
            case "follow":
                Notification followNotification = new Notification(content, new Date(),userToGetNotified);
                notificationRepository.save(followNotification);
                break;
            case "like":
                Notification likeNotification = new Notification(content, new Date() ,userToGetNotified);
                notificationRepository.save(likeNotification);
                break;
            case "comment":
                Notification commentNotification = new Notification(content, new Date() ,userToGetNotified);
                notificationRepository.save(commentNotification);
        }
    }

    public void removeUserNotifications(long userId) {
        if (userRepository.existsById(userId)) {
            notificationRepository.deleteAllByUserId(userId);
        }
    }

}
