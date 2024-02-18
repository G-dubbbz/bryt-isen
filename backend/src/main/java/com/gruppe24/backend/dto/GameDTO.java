package com.gruppe24.backend.dto;

import java.util.Optional;

/**
 * Represents a Game-Data Transfer Object.
 * <p>
 * This class carries information from the json-object retrieved from the frontend.
 * </p>
 */
public class GameDTO {

  private String name;
  private String description;
  private int players;
  private int duration;
  private int category;

  public Optional<String> getName() {
    return Optional.ofNullable(name);
  }

  public void setName(String name) {
    this.name = name;
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Optional<Integer> getPlayers() {
    return Optional.ofNullable(players);
  }

  public void setPlayers(int players) {
    this.players = players;
  }

  public Optional<Integer> getDuration() {
    return Optional.ofNullable(duration);
  }

  public void setDuration(int duration) {
    this.duration = duration;
  }

  public Optional<Integer> getCategory() {
    return Optional.ofNullable(category);
  }

  public void setCategory(int category) {
    this.category = category;
  }

}
