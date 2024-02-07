package com.gruppe24.backend.relation;

import com.gruppe24.backend.entity.Category;
import com.gruppe24.backend.entity.Game;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Represents a HasCategory relationship in the database.
 * <p>
 * This class contains the ID of the game and the name of the category it has.
 * </p>
 */
@Entity
public class HasCategory {

    @Id
    private Game game;

    @Id
    private Category category;

    // ADD GETTERS AND SETTERS

    // ADD TOSTRING
    
}
