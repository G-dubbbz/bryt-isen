package com.gruppe24.backend.relation;

import com.gruppe24.backend.entity.GameList;
import com.gruppe24.backend.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Represents a HasGameList relationship in the database.
 * <p>
 * This class contains the username of the user and the ID of the GameList the user has.
 * </p>
 */
@Entity
public class HasGameList {
    
    
    // Skal id være både User.UserName og GameList.ID? hvordan skriver man i så fall det
    @Id
    private User user;      // men bare brukernavnet??
    
    @Id
    private GameList gameList;

    // ADD GETTERS AND SETTERS FOR KEYS

    /// ADD TOSTRING

}
