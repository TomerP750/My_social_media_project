package app.mysocialmedia.Beans;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Followings")
public class Following {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false)
    private User follower;

    @ManyToOne
    @JoinColumn(name = "followed_id", nullable = false)
    private User followed;

    public Following() {
    }

    public Following(User follower, User followed) {
        this.follower = follower;
        this.followed = followed;
    }

    // Getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getFollowd() {
        return followed;
    }

    public void setFollowed(User followed) {
        this.followed = followed;
    }

    @Override
    public String toString() {
        return "Following{" +
                "id=" + id +
                ", follower=" + follower +
                ", following=" + followed +
                '}';
    }

}