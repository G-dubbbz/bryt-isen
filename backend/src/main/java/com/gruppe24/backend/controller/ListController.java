package com.gruppe24.backend.controller;

import com.gruppe24.backend.service.GameListService;
import com.gruppe24.backend.entity.GameList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <b>User Controller</b>
 * <p>
 * This controller provides API endpoints for managing {@link GameList} entities. It serves as the interface
 * between the front-end and the service layer, handling web requests to perform CRUD operations
 * on gamelist data.
 * </p>
 * <p>
 * Responsibilities include:
 * - Retrieving a list of all gamelists from the database.
 * - (Future methods might include creating, updating, and deleting gamelists, as well as authentication and authorization.)
 * </p>
 * <p>
 * All responses are formatted as JSON, making it easy for clients to parse and use the data. This
 * controller works closely with the {@link GameListService} to delegate business logic operations, ensuring
 * that the controller remains focused on web-related tasks.
 * </p>
 * <ul>
 * Usage:
 *   <li>GET /lists: Retrieves a list of all gamelists</li>
 * </ul>
 * @version 1.0
 */
@RestController
@RequestMapping("/lists")
public class ListController {

  private final GameListService gameListService;

  public ListController(GameListService gameListService) {
    this.gameListService = gameListService;
  }

  /**
   * Retrieves a list of all gamelists
   * @return A list of {@link GameList} entites
   */
  @GetMapping
  public List<GameList> readLists() {
    return gameListService.readLists();
  }

}

