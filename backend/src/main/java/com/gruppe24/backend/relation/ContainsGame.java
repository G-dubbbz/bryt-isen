package com.gruppe24.backend.relation;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.GameList;

import com.gruppe24.backend.idclass.ContainsGameID;
import jakarta.persistence.*;

/**
 * Represents a ContainsGame relationship in the database.
 * <p>
 * This class contains the ID of the game and the ID of the gamelist it is on.
 * </p>
 */
@Entity
@IdClass(ContainsGameID.class)
public class ContainsGame {

    @Id
    @ManyToOne
    @JoinColumn(name = "GameId")
    private Game game;

    @Id
    @ManyToOne
    @JoinColumn(name = "ListID")
    private GameList gameList;

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public GameList getGameList() {
        return gameList;
    }

    public void setGameList(GameList gameList) {
        this.gameList = gameList;
    }

    // TODO: ADD TOSTRING

}
