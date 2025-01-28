package app.mysocialmedia.Beans;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name="post_comments")
public class PostComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Post post;

    private Date dateCommented;
    @ManyToOne
    private User commentAuthor;
    private String message;


    public PostComment() {

    }

    public PostComment(Post post, Date dateCommented, User commentAuthor, String message) {
        this.post = post;
        this.dateCommented = dateCommented;
        this.commentAuthor = commentAuthor;
        this.message = message;
    }

    public PostComment(Post post, User commentAuthor, String message) {
        this.post = post;
        this.commentAuthor = commentAuthor;
        this.message = message;
    }

    public PostComment(Post post, String message) {
        this.post = post;
        this.message = message;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getCommentAuthor() {
        return commentAuthor;
    }

    public Date getDateCommented() {
        return dateCommented;
    }

    public void setDateCommented(Date dateCommented) {
        this.dateCommented = dateCommented;
    }

    public void setCommentAuthor(User commentAuthor) {
        this.commentAuthor = commentAuthor;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "PostComment{" +
                "id=" + id +
                ", post=" + post +
                ", dateCommented=" + dateCommented +
                ", commentAuthor=" + commentAuthor +
                ", message='" + message + '\'' +
                '}';
    }
}
