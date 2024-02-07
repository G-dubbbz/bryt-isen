package com.gruppe24.backend.controller;

import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <b>User Controller</b>
 * <p>
 * This controller provides API endpoints for managing {@link User} entities. It serves as the interface
 * between the front-end and the service layer, handling web requests to perform CRUD operations
 * on user data.
 * </p>
 * <p>
 * Responsibilities include:
 * - Retrieving a list of all users from the database.
 * - (Future methods might include creating, updating, and deleting users, as well as authentication and authorization.)
 * </p>
 * <p>
 * All responses are formatted as JSON, making it easy for clients to parse and use the data. This
 * controller works closely with the {@link UserService} to delegate business logic operations, ensuring
 * that the controller remains focused on web-related tasks.
 * </p>
 * <ul>
 * Usage:
 *   <li>GET /users: Retrieves a list of all users</li>
 * </ul>
 * @version 1.0
 */
@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  /**
   * Retrieves a list of all user
   * @return A list of {@link User} entites
   */
  @GetMapping
  public List<User> readUsers() {
    return userService.readUsers();
  }
}
