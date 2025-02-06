package app.mysocialmedia.NotificationsFeature;

import app.mysocialmedia.Beans.User;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String content;

    private Date dateNotified;
    @ManyToOne
    private User user;

    public Notification() {
    }

    public Notification(String content, Date dateNotified, User user) {
        this.content = content;
        this.dateNotified = dateNotified;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public Date getDateNotified() {
        return dateNotified;
    }

    public User getUser() {
        return user;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDateNotified(Date dateNotified) {
        this.dateNotified = dateNotified;
    }
}
