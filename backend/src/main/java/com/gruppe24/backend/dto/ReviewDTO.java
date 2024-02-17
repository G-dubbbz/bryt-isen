package com.gruppe24.backend.dto;

import java.security.Timestamp;
import java.time.Instant;
import java.util.Optional;

public class ReviewDTO {

  private String title;
  private String description;
  private int stars;

  public Optional<String> getTitle() {
    return Optional.ofNullable(title);
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Optional<Integer> getStars() {
    return Optional.of(stars);
  }

  public void setStars(int stars) {
    this.stars = stars;
  }
}
