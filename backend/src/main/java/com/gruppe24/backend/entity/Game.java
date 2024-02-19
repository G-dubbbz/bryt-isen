package com.gruppe24.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Represents a game entity in the database.
 * <p>
 * This class is mapped to the Game table in the database and includes details about each game such as its ID, name, rating and description.
 * </p>
 */
@Entity
public class Game {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long ID;

  private String name;
  private String description;
  private int players;
  private int duration;
  private float rating;
  private int reviewCount;
  private int reportCount;
  private int category;

  public long getID() {
    return ID;
  }

  public void setID(long iD) {
    ID = iD;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public int getPlayers() {
    return players;
  }

  public void setPlayers(int players) {
    this.players = players;
  }

  public int getDuration() {
    return duration;
  }

  public void setDuration(int duration) {
    this.duration = duration;
  }

  public float getRating() {
    return rating;
  }

  public void setRating(float rating) {
    this.rating = rating;
  }

  public int getReviewCount() {
    return reviewCount;
  }

  public void setReviewCount(int reviewCount) {
    this.reviewCount = reviewCount;
  }

  public int getReportCount() {
    return reportCount;
  }

  public void setReportCount(int reportCount) {
    this.reportCount = reportCount;
  }

  public int getCategory() {
    return category;
  }

  public void setCategory(int category) {
    this.category = category;
  }

  @Override
  public String toString() {
    return "Game [ID=" + ID + ", name=" + name + ", description=" + description + ", players=" + players
            + ", duration=" + duration + ", rating=" + rating + ", reviewCount=" + reviewCount + ", reportCount="
            + reportCount + ", category=" + category + "]";
  }

}
