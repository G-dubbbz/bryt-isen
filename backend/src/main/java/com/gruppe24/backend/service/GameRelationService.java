package com.gruppe24.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.exception.GameNotFoundException;
import com.gruppe24.backend.relation.Review;
import com.gruppe24.backend.repository.GameRepository;
import com.gruppe24.backend.repository.CategoryRepository;
import com.gruppe24.backend.repository.MadeGameRepository;
import com.gruppe24.backend.repository.ReviewRepository;

import jakarta.transaction.TransactionScoped;
import jakarta.transaction.Transactional;

@Service
public class GameRelationService {
    private final GameRepository gameRepository;
    private final ReviewRepository reviewRepository;
    private final MadeGameRepository madeGameRepository;
    private final CategoryRepository categoryRepository;



    public GameRelationService(GameRepository gameRepository, ReviewRepository reviewRepository, MadeGameRepository madeGameRepository, HasCategoryRepository hasCategoryRepository) {
        this.gameRepository = gameRepository;
        this.reviewRepository = reviewRepository;
        this.madeGameRepository = madeGameRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public User getGamesCreator(Long ID) {
        try {
            User creator = madeGameRepository.findByGame_ID(ID).getUser();
            return creator;
        } catch (Exception e) {
            throw new GameNotFoundException();
        }
    }

    @Transactional
    public List<Review> getGamesReviews(Long ID) {
        try {
            List<Review> review = reviewRepository.findByGame_ID(ID);
            return review;
        } catch (Exception e) {
            return List.of();
        }
    }
    
}