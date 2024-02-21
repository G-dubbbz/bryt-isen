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
  private String rules;
  private String emoji;
  private int players_min;
  private int players_max;
  private int duration_min;
  private int duration_max;

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

  public Optional<String> getRules() {
    return Optional.ofNullable(rules);
  }

  public void setRules(String rules) {
    this.rules = rules;
  }

  public Optional<String> getEmoji() {
    return Optional.ofNullable(emoji);
  }

  public void setEmoji(String emoji) {
    this.emoji = emoji;
  }

  public Optional<Integer> getPlayers_max() {
    return Optional.of(players_max);
  }

  public void setPlayers_max(int players) {
    this.players_max = players;
  }

  public Optional<Integer> getPlayers_min() {
    return Optional.of(players_min);
  }

  public void setPlayers_min(int players) {
    this.players_min = players;
  }

  public Optional<Integer> getDuration_max() {
    return Optional.of(duration_max);
  }

  public void setDuration_max(int duration) {
    this.duration_max = duration;
  }

  public Optional<Integer> getDuration_min() {
    return Optional.of(duration_min);
  }

  public void setDuration_min(int duration) {
    this.duration_min = duration;
  }


}
