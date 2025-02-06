package app.mysocialmedia.NotificationsFeature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    @Query(value = "SELECT COUNT(*) FROM notifications WHERE user_id = ?1",nativeQuery = true)
    int getNotificationCount(long userId);
    @Transactional
    @Modifying
    void deleteAllByUserId(long userId);
    List<Notification> findByUserId(long userId);

}
