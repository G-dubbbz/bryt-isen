package com.gruppe24.backend.controller;

import com.gruppe24.backend.dto.GameDTO;
import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.service.GameRelationService;
import com.gruppe24.backend.service.GameService;
import com.gruppe24.backend.exception.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
  private final GameRelationService gameRelationService;

  private static final Logger log = LoggerFactory.getLogger(GameController.class);

  private GameController(GameService gameService, GameRelationService gameRelationService) {
    this.gameService = gameService;
    this.gameRelationService = gameRelationService;
  }

  /**
   * Retrieves a list of all games
   * @return A list of {@link Game} entites
   */
  @GetMapping
  public ResponseEntity<?> readGames() {
    return ResponseEntity.ok(gameService.readGames());
  }

  @GetMapping("/{ID}")
  public ResponseEntity<Game> getGame(@PathVariable Long ID) {
    try {
      Game game = gameService.getGame(ID);
      log.info("Game found with id:" + ID + "\n" + game);
      return new ResponseEntity<>(game, HttpStatus.FOUND);
    } catch (UserNotFoundException e) {
      log.error(e.getMessage());
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping("/create")
  public ResponseEntity<?> createGame(@RequestBody GameDTO gameDTO) {
    try {
      gameService.createGame(gameDTO);
      return ResponseEntity.ok().build();
    } catch (ErrorCreatingGameException e) {
      log.error(e.getMessage());
      return ResponseEntity.badRequest().build();
    }
  }

  @PatchMapping("/{ID}/update")
  public  ResponseEntity<?> updateGame(@PathVariable Long ID, @RequestBody GameDTO gameDTO) {
    try {
      gameService.updateGame(gameDTO, ID);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      log.error("Error updating game:" + e);
      return ResponseEntity.badRequest().build();
    }
  }

  @DeleteMapping("/{ID}")
  public ResponseEntity<?> deleteGame(@PathVariable Long ID) {
    try {
      gameService.deleteGame(ID);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      log.error("Error deleting game:" + e);
      return ResponseEntity.badRequest().build();
    }
  }
}
