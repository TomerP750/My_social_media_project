package app.mysocialmedia.UserProfileFeature;

import app.mysocialmedia.Beans.User;
import jakarta.persistence.*;

@Entity
@Table(name = "banners")
public class ProfileBanner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String url;

    @OneToOne
    private User user;

    public ProfileBanner() {
    }

    public ProfileBanner(String url, User user) {
        this.url = url;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public User getUser() {
        return user;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
