package com.gruppe24.backend.controller;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.service.GameService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <strong>Game Controller</strong>
 *
 * <p> This controller provides API endpoints for managing {@link Game} entities. It serves as the interface
 * between the front-end and the service layer, handling web requests to perform CRUD operations
 * on game data. </p>
 *
 * <ul>
 *  <strong>Responsibilities include</strong>:
 *  <li>Retrieving a list of all games from the database.</li>
 *  <li>(Future methods might include creating, updating, and deleting games, as well as authentication and authorization.)</li>
 * </ul>
 *
 * <p> All responses are formatted as JSON, making it easy for clients to parse and use the data. This
 * controller works closely with the {@link GameService} to delegate business logic operations, ensuring
 * that the controller remains focused on web-related tasks. </p>
 *
 * <ul>
 * <strong>Usage</strong>:
 *   <li>GET /games: Retrieves a list of all games</li>
 * </ul>
 *
 * @version 1.0
 */
@RestController
@RequestMapping("/games")
public class GameController {

  private final GameService gameService;

  private GameController(GameService gameService) {
    this.gameService = gameService;
  }

  /**
   * Retrieves a list of all games
   * @return A list of {@link Game} entites
   */
  @GetMapping
  public List<Game> readGames() {
    return gameService.readGames();
  }

}
