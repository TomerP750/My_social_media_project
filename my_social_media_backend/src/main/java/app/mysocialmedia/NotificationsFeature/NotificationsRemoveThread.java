package app.mysocialmedia.NotificationsFeature;

import app.mysocialmedia.Services.UserService;
import org.springframework.scheduling.annotation.Scheduled;

public class NotificationsRemoveThread implements Runnable {

    private NotificationRepository notificationRepository;
    private UserService userService;

    public NotificationsRemoveThread(NotificationRepository notificationRepository, UserService userService) {
        this.notificationRepository = notificationRepository;
        this.userService = userService;
    }

    @Override
    @Scheduled(cron = "0 1 0 * * *")
    public void run() {
        notificationRepository.deleteAllByUserId(userService.getUserDetails().getId());
    }
}
