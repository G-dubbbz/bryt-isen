package com.gruppe24.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Default Rest Controller
 * <p>
 * This controller handles the main entrypoint, which at the moment is mostly a hello world GET mapping
 * and a status GET mapping
 * </p>
 *
 * @version 1.0
 */
@RestController
public class DefaultController {

  @GetMapping("/")
  public String index() {
    return "Hello World";
  }

  /**
   * Check the status of the server.
   *
   * @return HTTPS_status_code 200
   */
  @GetMapping("/status")
  public ResponseEntity<?> status() {
    return ResponseEntity.ok().build();
  }

  @GetMapping("/secured")
  public String secured() {
    return "Hello, secured!";
  }

  @GetMapping("/me")
  public Map<String, Object> userDetails(@AuthenticationPrincipal OAuth2User user) {
    return user.getAttributes();
  }


}
