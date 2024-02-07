package com.gruppe24.backend.idclass;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.User;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.util.Objects;

public class ReviewID implements Serializable {

  private User user;

  private Game game;

  public ReviewID(User user, Game game) {
    this.user = user;
    this.game = game;
  }

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

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    ReviewID reviewID = (ReviewID) o;
    return Objects.equals(user, reviewID.user) && Objects.equals(game, reviewID.game);
  }

  @Override
  public int hashCode() {
    return Objects.hash(user, game);
  }
}
