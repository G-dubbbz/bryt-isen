package com.gruppe24.backend.service;

import com.gruppe24.backend.entity.Category;
import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.exception.CategoryNotFoundException;
import com.gruppe24.backend.exception.GameNotFoundException;
import com.gruppe24.backend.exception.UserNotFoundException;
import com.gruppe24.backend.relation.HasCategory;
import com.gruppe24.backend.relation.HasReported;
import com.gruppe24.backend.relation.MadeGame;
import com.gruppe24.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Provides services for managing relationships and interactions related to Game
 * entities.
 * This service layer acts as an intermediary between the controller layer and
 * the repository/data access layer.
 * It encapsulates business logic concerning game relationships, such as
 * managing game creators, reviews, categories,
 * and the creation and deletion of these relationships, ensuring transactional
 * safety and business rule enforcement.
 *
 * <p>
 * Key functionalities include:
 * </p>
 * <ul>
 * <li>Retrieving the creator of a specific game.</li>
 * <li>Fetching all reviews or categories associated with a specific game.</li>
 * <li>Creating and deleting relationships between games and users (MadeGame
 * relationships).</li>
 * <li>Managing reviews for games, including creating and deleting reviews, and
 * updating game ratings accordingly.</li>
 * </ul>
 *
 * <p>
 * This service is intended for use by higher-level components, such as REST
 * controllers,
 * or other services requiring manipulation and retrieval of game-related data.
 * </p>
 */
@Service
public class GameRelationService {
  private final GameRepository gameRepository;
  private final ReviewRepository reviewRepository;
  private final MadeGameRepository madeGameRepository;
  private final HasCategoryRepository hasCategoryRepository;
  private final CategoryRepository categoryRepository;
  private final HasReportedRepository hasReportedRepository;

  public GameRelationService(GameRepository gameRepository, ReviewRepository reviewRepository,
                             MadeGameRepository madeGameRepository, HasCategoryRepository hasCategoryRepository,
                             CategoryRepository categoryRepository, HasReportedRepository hasReportedRepository) {
    this.gameRepository = gameRepository;
    this.reviewRepository = reviewRepository;
    this.madeGameRepository = madeGameRepository;
    this.hasCategoryRepository = hasCategoryRepository;
    this.categoryRepository = categoryRepository;
    this.hasReportedRepository = hasReportedRepository;
  }

  @Transactional
  public User getGamesCreator(Long ID) {
    MadeGame madeGame = madeGameRepository.findByGame_ID(ID).orElseThrow(UserNotFoundException::new);
    return madeGame.getUser();
  }

  @Transactional
  public List<Category> getGamesCategories(Long ID) {
    return hasCategoryRepository.findByGame_ID(ID)
            .orElseThrow(CategoryNotFoundException::new).stream()
            .map(HasCategory::getCategory).toList();
  }

  @Transactional
  public void createMadeGameRelation(Game game, User authenticatedUser) {
    if (game == null) {
      throw new GameNotFoundException();
    }
    MadeGame madeGame = new MadeGame();
    madeGame.setGame(game);
    madeGame.setUser(authenticatedUser);
    madeGame.setCreatedAt(LocalDateTime.now());
    madeGameRepository.save(madeGame);
  }

  @Transactional
  public void deleteMadeGameRelation(Long ID) {
    if (madeGameRepository.findByGame_ID(ID).isEmpty()) {
      throw new GameNotFoundException();
    }
    MadeGame madeGame = madeGameRepository.findByGame_ID(ID).get();
    madeGameRepository.delete(madeGame);
  }

  @Transactional
  public void addCategories(Long gameID, List<String> categories) {
    Game game = gameRepository.findByID(gameID).orElseThrow(GameNotFoundException::new);
    ArrayList<String> categoriesNotFound = new ArrayList<>();
    for (String categoryName : categories) {
      if (categoryRepository.findByName(categoryName).isEmpty()) {
        categoriesNotFound.add(categoryName);
        continue;
      }
      Category category = categoryRepository.findByName(categoryName).get();
      HasCategory hasCategory = new HasCategory();
      hasCategory.setGame(game);
      hasCategory.setCategory(category);
      hasCategoryRepository.save(hasCategory);
    }
    if (categoriesNotFound.isEmpty()) {
      throw new CategoryNotFoundException("Categories not found: " + categoriesNotFound);
    }
  }

  @Transactional
  public void reportGame(User user, Long gameID) {
    Game game = gameRepository.findByID(gameID).orElseThrow(GameNotFoundException::new);
    if (hasReportedRepository.findByUser_UserNameAndGame_ID(user.getUserName(), gameID).isEmpty()) {
      HasReported reported = new HasReported();
      reported.setGame(game);
      reported.setUser(user);
      hasReportedRepository.save(reported);
      game.setReportCount(game.getReportCount() + 1);
      gameRepository.save(game);
    }
  }

  @Transactional
  public void unReportGame(User user, Long gameID) {
    Game game = gameRepository.findByID(gameID).orElseThrow(GameNotFoundException::new);
    if (hasReportedRepository.findByUser_UserNameAndGame_ID(user.getUserName(), gameID).isPresent()) {
      hasReportedRepository.delete(hasReportedRepository.findByUser_UserNameAndGame_ID(user.getUserName(), gameID).get());
      game.setReportCount(game.getReportCount() - 1);
      gameRepository.save(game);
    }
  }

  @Transactional
  public boolean hasReportedGame(User user, Long gameID) {
    return hasReportedRepository.findByUser_UserNameAndGame_ID(user.getUserName(), gameID).isPresent();
  }
}