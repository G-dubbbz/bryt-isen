package com.gruppe24.backend.service;

import com.gruppe24.backend.entity.GameList;
import com.gruppe24.backend.repository.GameListRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <strong>Service layer for managing {@link GameList} entities.</strong>
 *
 * <p>This service encapsulates the business logic for game list management, acting as an intermediary
 * between the controller layer and the data access layer. It leverages the {@link GameListRepository}
 * for CRUD operations on {@link GameList} entities, ensuring that business rules and logic are
 * consistently applied. This abstraction allows for cleaner controllers and promotes the separation
 * of concerns within the application.</p>
 *
 * <p>Methods in this service are transactional, ensuring data integrity and consistency during
 * operations that involve multiple steps or queries. This transactional management is crucial
 * for operations that modify data, safeguarding against partial updates and data anomalies.</p>
 *
 * <ul>
 *   <strong>Key Functionalities Include:</strong>
 *   <li>Retrieving all game lists from the database.</li>
 *   <li>(Future functionalities such as creating, updating, and deleting game lists.)</li>
 * </ul>
 *
 * <p>Usage of this service should be limited to interaction through higher-level components
 * such as REST controllers or other services requiring game list manipulation and retrieval.</p>
 */
@Service
public class GameListService {

  private final GameListRepository gameListRepository;

  public GameListService(GameListRepository gameListRepository) {
    this.gameListRepository = gameListRepository;
  }

  /**
   * Retrieves all game lists from the repository.
   * @return A list of {@link GameList} entities.
   */
  @Transactional
  public List<GameList> readLists() {
    return gameListRepository.findAll();
  }
}
