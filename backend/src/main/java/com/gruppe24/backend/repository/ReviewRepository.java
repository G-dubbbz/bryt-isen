package com.gruppe24.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.relation.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    public Review findByUserName(String name);

    public Review findByGameID(Long gameID);

}
