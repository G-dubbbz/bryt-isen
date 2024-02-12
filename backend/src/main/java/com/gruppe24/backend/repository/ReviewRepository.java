package com.gruppe24.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.relation.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    Review findByUser_UserName(String name);

    Review findByGame_ID(Long gameID);

}
