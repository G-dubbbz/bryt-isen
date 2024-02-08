package com.gruppe24.backend.relation;

import com.gruppe24.backend.entity.GameList;
import com.gruppe24.backend.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

/**
 * Represents a HasGameList relationship in the database.
 * <p>
 * This class contains the username of the user and the ID of the GameList the user has.
 * </p>
 */
@Entity
public class HasGameList {
    
    @Id
    @ManyToOne
    private User user;
    
    @Id
    @OneToOne
    private GameList gameList;

    // TODO: ADD GETTERS AND SETTERS FOR KEYS

    // TODO: ADD TOSTRING

}
