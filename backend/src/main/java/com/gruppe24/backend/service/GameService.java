package com.gruppe24.backend.service;

import com.gruppe24.backend.dto.GameDTO;
import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.exception.GameNotFoundException;
import com.gruppe24.backend.exception.InvalidDtoException;
import com.gruppe24.backend.repository.GameRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <strong>Service layer for managing {@link Game} entities.</strong>
 *
 * <p>This service encapsulates the business logic for game management, acting as an intermediary
 * between the controller layer and the data access layer. It leverages the {@link GameRepository}
 * for CRUD operations on {@link Game} entities, ensuring that business rules and logic are
 * consistently applied. This abstraction allows for cleaner controllers and promotes the separation
 * of concerns within the application.</p>
 *
 * <p>Methods in this service are transactional, ensuring data integrity and consistency during
 * operations that involve multiple steps or queries. This transactional management is crucial
 * for operations that modify data, safeguarding against partial updates and data anomalies.</p>
 *
 * <ul>
 *   <strong>Key Functionalities Include:</strong>
 *   <li>Retrieving all games from the database.</li>
 *   <li>Creating a new game with a given creator/user.</li>
 *   <li>Retrieving a specified game with the given ID</li>
 *   <li>Delete a specified game with the given ID</li>
 * </ul>
 *
 * <p>Usage of this service should be limited to interaction through higher-level components
 * such as REST controllers or other services requiring game manipulation and retrieval.</p>
 */
@Service
public class GameService {
  private final GameRepository gameRepository;

  public GameService(GameRepository gameRepository) {
    this.gameRepository = gameRepository;
  }

  @Transactional
  public List<Game> readGames() {
    return gameRepository.findAll();
  }

  @Transactional
  public Game createGame(GameDTO gameDTO) {
    Game game = new Game();
    gameDTO.getName().ifPresentOrElse(game::setName, InvalidDtoException::new);
    gameDTO.getCategory().ifPresentOrElse(game::setCategory, InvalidDtoException::new);
    gameDTO.getDescription().ifPresentOrElse(game::setDescription, InvalidDtoException::new);
    gameDTO.getDuration().ifPresentOrElse(game::setDuration, InvalidDtoException::new);
    gameDTO.getPlayers().ifPresentOrElse(game::setPlayers, InvalidDtoException::new);
    return gameRepository.save(game);
  }

  @Transactional
  public Game getGame(Long ID) {
    return gameRepository.findByID(ID).orElseThrow(GameNotFoundException::new);
  }

  @Transactional
  public void updateGame(GameDTO gameDTO, Long ID) {
    Game game = gameRepository.findByID(ID).orElseThrow(GameNotFoundException::new);
    gameDTO.getName().ifPresent(game::setName);
    gameDTO.getCategory().ifPresent(game::setCategory);
    gameDTO.getDescription().ifPresent(game::setDescription);
    gameDTO.getDuration().ifPresent(game::setDuration);
    gameDTO.getPlayers().ifPresent(game::setPlayers);
    gameRepository.save(game);
  }

  @Transactional
  public void deleteGame(Long ID) {
    gameRepository.delete(gameRepository.findByID(ID).orElseThrow(GameNotFoundException::new));
  }
}
