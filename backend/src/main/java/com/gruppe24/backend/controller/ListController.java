package com.gruppe24.backend.controller;

import com.gruppe24.backend.dto.GameListDTO;
import com.gruppe24.backend.entity.GameList;
import com.gruppe24.backend.service.GameListRelationService;
import com.gruppe24.backend.service.GameListService;
import com.gruppe24.backend.service.SecurityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <b>User Controller</b>
 *
 * <p> This controller provides API endpoints for managing {@link GameList} entities. It serves as the interface
 * between the front-end and the service layer, handling web requests to perform CRUD operations
 * on gamelist data. </p>
 * <ul>
 *  <strong>Responsibilities include:</strong>
 *  <li>Retrieving a list of all gamelists from the database.</li>
 *  <li>(Future methods might include creating, updating, and deleting gamelists, as well as authentication and authorization.)</li>
 * </ul>
 *
 * <p> All responses are formatted as JSON, making it easy for clients to parse and use the data. This
 * controller works closely with the {@link GameListService} to delegate business logic operations, ensuring
 * that the controller remains focused on web-related tasks. </p>
 *
 * <ul>
 *   <strong>Usage:</strong>
 *   <li>GET /lists: Retrieves a list of all gamelists</li>
 * </ul>
 *
 * @version 1.0
 */
@RestController
@RequestMapping("/lists")
public class ListController {

  private final GameListService gameListService;
  private final GameListRelationService gameListRelationService;
  private final SecurityService securityService;

  public ListController(GameListService gameListService, GameListRelationService gameListRelationService, SecurityService securityService) {
    this.gameListService = gameListService;
    this.gameListRelationService = gameListRelationService;
    this.securityService = securityService;
  }

  /**
   * Retrieves a list of all gamelists
   *
   * @return HTTP response <b>200 OK</b> list of {@link GameList} entites
   */
  @GetMapping
  public ResponseEntity<List<GameList>> readLists() {
    return ResponseEntity.ok(gameListService.readLists());
  }

  @GetMapping("/{ID}")
  public ResponseEntity<GameList> getGameList(@PathVariable Long ID) {
    return new ResponseEntity<>(gameListService.getList(ID), HttpStatus.OK);
  }

  @PostMapping("/create")
  public ResponseEntity<String> createGameList(@RequestBody GameListDTO gameListDTO) {
    GameList list = gameListService.createGameList(gameListDTO);
    gameListRelationService.createHasGameListRelation(securityService.getAuthenticatedUser(), list);
    return new ResponseEntity<>("Game-list successfully created", HttpStatus.CREATED);
  }

  @PostMapping("/{ID}/{gameID}")
  public  ResponseEntity<String> addGameToList(@PathVariable Long ID, @PathVariable Long gameID) {
    gameListRelationService.addGameToList(gameID, ID);
    return new ResponseEntity<>("Game successfully added to list", HttpStatus.OK);
  }

}

