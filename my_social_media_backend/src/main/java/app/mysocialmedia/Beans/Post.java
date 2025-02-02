package app.mysocialmedia.Beans;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;
import java.time.LocalDateTime;


@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
//    @Temporal(TemporalType.TIMESTAMP)
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS") // This ensures that the full date and time is serialized correctly

    private Date datePosted;
    @ManyToOne
    private User author;
    @Column(length = 1000)
    private String content;
    private long likeCount;

    private boolean isEdited;

    public Post() {
    }

    public Post(Date datePosted, User author, String content, long likeCount) {
        this.datePosted = datePosted;
        this.author = author;
        this.content = content;
        this.likeCount = likeCount;
    }

    public Post(Date datePosted, User author, String content, long likeCount, boolean isEdited) {
        this.datePosted = datePosted;
        this.author = author;
        this.content = content;
        this.likeCount = likeCount;
        this.isEdited = isEdited;
    }



    public long getId() {
        return id;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public User getAuthor() {
        return author;
    }

    public String getContent() {
        return content;
    }

    public long getLikeCount() {
        return likeCount;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDatePosted(Date datePosted) {
        this.datePosted = datePosted;
    }

    public void setLikeCount(long likeCount) {
        this.likeCount = likeCount;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public boolean isEdited() {
        return isEdited;
    }

    public void setIsEdited(boolean edited) {
        isEdited = edited;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", datePosted=" + datePosted +
                ", author=" + author +
                ", content='" + content + '\'' +
                ", likeCount=" + likeCount +
                ", isEdited=" + isEdited +
                '}';
    }
}
