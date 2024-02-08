package com.gruppe24.backend.relation;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.GameList;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Represents a ContainsGame relationship in the database.
 * <p>
 * This class contains the ID of the game and the ID of the gamelist it is on.
 * </p>
 */
@Entity
public class ContainsGame {

    @Id
    private Game game;

    @Id
    private GameList gameList;

    // TODO: ADD GETTERS AND SETTERS FOR KEYS
    
    // TODO: ADD TOSTRING

}
