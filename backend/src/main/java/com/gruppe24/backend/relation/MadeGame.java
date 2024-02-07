package com.gruppe24.backend.relation;

import java.security.Timestamp;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


/**
 * Represents a MadeGame relationship in the database.
 * <p>
 * This class contains the ID of the game and the ID of the user who made it, as well as a timestamp of when the game was made.
 * </p>
 */
@Entity
public class MadeGame {
    
    @Id
    private User user;

    @Id
    private Game game;

    private Timestamp timestamp;

    // ADD GETTERS AND SETTERS FOR KEYS


    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    // ADD TOSTRING

}
