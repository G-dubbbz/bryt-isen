package com.gruppe24.backend.service;

import java.util.List;

import com.gruppe24.backend.relation.MadeGame;
import org.springframework.stereotype.Service;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.GameList;
import com.gruppe24.backend.exception.UserNotFoundException;
import com.gruppe24.backend.relation.Review;
import com.gruppe24.backend.repository.HasGameListRepository;
import com.gruppe24.backend.repository.MadeGameRepository;
import com.gruppe24.backend.repository.ReviewRepository;
import com.gruppe24.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

/**
 * <strong>Service layer for managing {@link Game} entity's relations.</strong>
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
 * <li>Retrieving all the user's {@link GameList} from the database.</li>
 * <li>Retrieving all the {@link Game} the user has made from the database.</li>
 * <li>Retrieving all the {@link Review} the user has written from the database.</li>
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
public class UserRelationService {

    private final UserRepository userRepository;
    private final HasGameListRepository hasGameListRepository;
    private final MadeGameRepository madeGameRepository;
    private final ReviewRepository reviewRepository;

    public UserRelationService(UserRepository userRepository, HasGameListRepository 
        hasGameListRepository, MadeGameRepository madeGameRepository, ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.hasGameListRepository = hasGameListRepository;
        this.madeGameRepository = madeGameRepository;
        this.reviewRepository = reviewRepository;
    }

    @Transactional
    public List<GameList> getUsersLists(String username) {
        try {
            return hasGameListRepository.findByUser_UserName(username);
        } catch (Exception e) {
            throw new UserNotFoundException();
        }
    }

    @Transactional
    public List<Game> getUsersMadeGame(String username) {
        try {
            List<MadeGame> madeGames = madeGameRepository.findByUser_UserName(username);
            return madeGames.stream()
                    .map(MadeGame::getGame)
                    .toList();
        } catch (Exception e) {
            throw new UserNotFoundException();
        }
    }

    @Transactional
    public List<Review> getUsersReviews(String username) {
        try {
            return reviewRepository.findByUser_UserName(username);
        } catch (Exception e) {
            throw new UserNotFoundException();
        }
    }
    
}
