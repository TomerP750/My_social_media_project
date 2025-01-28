package app.mysocialmedia.Beans;

import jakarta.persistence.*;

@Entity
@Table (name = "post_likes")
public class PostLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
    @ManyToOne
    @JoinColumn(name = "liker_id", nullable = false)
    private User liker;

    public PostLike() {
    }

    public PostLike(Post post, User liker) {
        this.post = post;
        this.liker = liker;
    }

    public Post getPost() {
        return post;
    }

    public long getId() {
        return id;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getLiker() {
        return liker;
    }

    public void setLiker(User liker) {
        this.liker = liker;
    }

    @Override
    public String toString() {
        return "PostLike{" +
                "id=" + id +
                ", post=" + post +
                ", liker=" + liker +
                '}';
    }
}
