package com.gruppe24.backend.dto;

import java.util.Optional;

/**
 * Represents a User-Data Transfer Object.
 * <p>
 * This class carries information from the json-object retrieved from the
 * frontend.
 * </p>
 */
public class UserDTO {

  // TODO: skal den være med selv om det er primærnøkkel?
  private String name;
  private String email;

  public Optional<String> getName() {
    return Optional.ofNullable(name);
  }

  public void setName(String name) {
    this.name = name;
  }

  public Optional<String> getEmail() {
    return Optional.ofNullable(email);
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
