package com.gruppe24.backend.service;

import com.gruppe24.backend.dto.UserDTO;
import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.exception.UserNotFoundException;
import com.gruppe24.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <strong>Service layer for managing {@link User} entities.</strong>
 *
 * <p>
 * This service encapsulates the business logic for user management, acting as
 * an intermediary
 * between the controller layer and the data access layer. It leverages the
 * {@link UserRepository}
 * for CRUD operations on {@link User} entities, ensuring that business rules
 * and logic are
 * consistently applied. This abstraction allows for cleaner controllers and
 * promotes the separation
 * of concerns within the application.
 * </p>
 *
 * <p>
 * Methods in this service are transactional, ensuring data integrity and
 * consistency during
 * operations that involve multiple steps or queries. This transactional
 * management is crucial
 * for operations that modify data, safeguarding against partial updates and
 * data anomalies.
 * </p>
 *
 * <ul>
 * <strong>Key Functionalities Include:</strong>
 * <li>Retrieving all users from the database.</li>
 * <li>(Future functionalities such as creating, updating, and deleting
 * users.)</li>
 * </ul>
 *
 * <p>
 * Usage of this service should be limited to interaction through higher-level
 * components
 * such as REST controllers or other services requiring user manipulation and
 * retrieval.
 * </p>
 */
@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Retrieves all users from the repository.
   * 
   * @return A list of {@link User} entities.
   */
  @Transactional
  public List<User> readUsers() {
    return userRepository.findAll();
  }

  /**
   * Retrieves a user from the repository.
   * 
   * @return A {@link User} entity.
   * 
   * @throws UserNotFoundException
   */
  @Transactional
  public User getUser(String username) {
    // TODO: Make sure username is not null
    try {
      return userRepository.getReferenceById(username);
    } catch (EntityNotFoundException e) {
      throw new UserNotFoundException();
    }
  }

  /**
   * Creates a user from the {@link UserDTO} entity.
   */
  @Transactional
  public void createUser(UserDTO userDTO) {
    // TODO: Make sure username is not null
    try {
      User user = userRepository.getReferenceById(userDTO.getName().orElseThrow(EntityNotFoundException::new));
      // TODO: Throw an exception if username is already taken
    } catch (EntityNotFoundException e) {
      User user = new User();
      // TODO: change exception
      userDTO.getName().ifPresentOrElse(user::setUserName, UserNotFoundException::new);
      // TODO: Add user attributts
      // user.setEmail(email);
      // user.setAdmin(false);
    }
  }

  /**
   * Updates the attributes of a user with information from the {@link UserDTO} entity.
   * @throws UserNotFoundException
   */
  @Transactional
  public void updateUser(String username, UserDTO userDTO) {
    // TODO: Make sure username is not null
    try {
      User user = userRepository.getReferenceById(username);
      // TODO: Add user attributts
      // user.setAdmin(false);
    } catch (EntityNotFoundException e) {
      throw new UserNotFoundException();
    }
  }

  /**
   * Deletes a user from the repository.
   * @throws UserNotFoundException
   */
  @Transactional
  public void deleteUser(String username) {
    // TODO: Make sure username is not null
    try {
      User user = userRepository.getReferenceById(username);
      userRepository.deleteById(username);
    } catch (EntityNotFoundException e) {
      throw new UserNotFoundException();
    }
  }

}
