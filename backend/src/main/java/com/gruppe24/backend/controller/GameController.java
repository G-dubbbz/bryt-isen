package com.gruppe24.backend.controller;

import com.gruppe24.backend.dto.GameDTO;
import com.gruppe24.backend.dto.ReviewDTO;
import com.gruppe24.backend.entity.Category;
import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.relation.Review;
import com.gruppe24.backend.service.GameRelationService;
import com.gruppe24.backend.service.GameService;
import com.gruppe24.backend.service.SecurityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
 *   <li>GET /games/{ID}: Retrieves the game with the given ID</li>
 *   <li>Post /games/create: Tries to create a game with given information</li>
 *   <li>Patch /games/{ID}: Tries to update the game with given ID</li>
 *   <li>Delete /games/{ID}: Tries to delete the game with given ID</li>
 * </ul>
 *
 * @version 1.0
 */
@RestController
@RequestMapping("/games")
public class GameController {

  private final GameService gameService;
  private final GameRelationService gameRelationService;
  private final SecurityService securityService;

  private GameController(GameService gameService, GameRelationService gameRelationService, SecurityService securityService) {
    this.gameService = gameService;
    this.gameRelationService = gameRelationService;
    this.securityService = securityService;
  }

  /**
   * Retrieves a list of all games
   *
   * @return A list of {@link Game} entites
   */
  @GetMapping
  public ResponseEntity<List<Game>> readGames() {
    return new ResponseEntity<>(gameService.readGames(), HttpStatus.OK);
  }

  @GetMapping("/{ID}")
  public ResponseEntity<Game> getGame(@PathVariable Long ID) {
    return new ResponseEntity<>(gameService.getGame(ID), HttpStatus.OK);
  }

  @PostMapping("/create")
  public ResponseEntity<Game> createGame(@RequestBody GameDTO gameDTO) {
    Game game = gameService.createGame(gameDTO);
    gameRelationService.createMadeGameRelation(game, securityService.getAuthenticatedUser());
    return new ResponseEntity<>(game, HttpStatus.CREATED);
  }

  @PatchMapping("/{ID}/update")
  public ResponseEntity<String> updateGame(@PathVariable Long ID, @RequestBody GameDTO gameDTO) {
      gameService.updateGame(gameDTO, ID);
      return new ResponseEntity<>("Game successfully updated", HttpStatus.OK);
  }

  @DeleteMapping("/{ID}")
  public ResponseEntity<String> deleteGame(@PathVariable Long ID) {
    gameService.deleteGame(ID);
    gameRelationService.deleteMadeGameRelation(ID);
    return new ResponseEntity<>("Game successfully deleted", HttpStatus.OK);
  }

  @GetMapping("/{ID}/reviews")
  public ResponseEntity<List<Review>> getGameReviews(@PathVariable Long ID) {
    return new ResponseEntity<>(gameRelationService.getGamesReviews(ID), HttpStatus.OK);
  }

  @PostMapping("/{ID}/reviews")
  public ResponseEntity<String> createReview(@PathVariable Long ID, @RequestBody ReviewDTO reviewDTO) {
    gameRelationService.createReview(securityService.getAuthenticatedUser(), ID, reviewDTO);
    return new ResponseEntity<>("Successfully created review", HttpStatus.CREATED);
  }

  @GetMapping("/{ID}/categories")
  public ResponseEntity<List<Category>> getGamesCategories(@PathVariable Long ID) {
    return new ResponseEntity<>(gameRelationService.getGamesCategories(ID), HttpStatus.OK);
  }

  @PostMapping("/{ID}/categories")
  public ResponseEntity<String> addGamesCategories(@PathVariable Long ID, @RequestBody List<String> categories) {
    gameRelationService.addCategories(ID, categories);
    return new ResponseEntity<>("Successfully added categories to game", HttpStatus.CREATED);
  }
}
