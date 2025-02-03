package app.mysocialmedia.UserProfileFeature;

import app.mysocialmedia.Beans.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "abouts")
public class AboutBio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private long id;
    private String content;

    @OneToOne
    @JsonIgnore
    private User user;

    public AboutBio() {
    }

    public AboutBio(String content, User user) {
        this.content = content;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public User getUser() {
        return user;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
