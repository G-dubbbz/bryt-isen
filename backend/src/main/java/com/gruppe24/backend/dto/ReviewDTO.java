package com.gruppe24.backend.dto;

import java.time.LocalDateTime;
import java.util.Optional;

public class ReviewDTO {

  private String description;
  private float stars;
  private LocalDateTime createdAt;

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Optional<Float> getStars() {
    return Optional.of(stars);
  }

  public void setStars(float stars) {
    this.stars = stars;
  }

  public Optional<LocalDateTime> getCreatedAt() {
    return Optional.ofNullable(createdAt);
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

}
