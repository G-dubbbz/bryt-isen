package com.gruppe24.backend.relation;

import java.security.Timestamp;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Represents a Review relationship in the database.
 * <p>
 * This class contains the ID of the game and the ID of the user who wrote the review, as well as some information about the review, such as a title, a timestamp, numbers of stars from 1-5 and a description.
 * </p>
 */
@Entity
public class Review {

    @Id
    private User user;
    
    @Id
    private Game game;

    private String title;
    private String description;
    private int stars;
    private Timestamp timestamp;

    // ADD GETTERS AND SETTERS FOR KEYS

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
    public Timestamp getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    // ADD TOSTRING
    
}
