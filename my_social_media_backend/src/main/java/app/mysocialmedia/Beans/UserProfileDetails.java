package app.mysocialmedia.Beans;

import jakarta.persistence.*;

@Entity
public class UserProfileDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private User user;
    private String about;
    private String banner;


    public UserProfileDetails() {
    }

    public UserProfileDetails(User user, String about, String banner) {
        this.user = user;
        this.about = about;
        this.banner = banner;
    }

    public long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getAbout() {
        return about;
    }

    public String getBanner() {
        return banner;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }
}
