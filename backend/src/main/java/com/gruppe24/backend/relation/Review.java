package com.gruppe24.backend.relation;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.idclass.ReviewID;

/**
 * Represents a Review relationship in the database.
 * <p>
 * This class contains the ID of the game and the ID of the user who wrote the review, as well as some information about the review, such as a title, a timestamp, numbers of stars from 1-5 and a description.
 * </p>
 */
@Entity
@IdClass(ReviewID.class)
public class Review {

    @Id
    @ManyToOne
    @JoinColumn(name = "UserName")
    private User user;
    
    @Id
    @ManyToOne
    @JoinColumn(name = "ID")
    private Game game;

    private String title;
    private String description;
    private int stars;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime timestamp) {
        this.createdAt = timestamp;
    }

    @Override
    public String toString() {
        return "Review [user=" + user + ", game=" + game + ", title=" + title + ", description=" + description
                + ", stars=" + stars + ", timestamp=" + createdAt + "]";
    }

    
}
