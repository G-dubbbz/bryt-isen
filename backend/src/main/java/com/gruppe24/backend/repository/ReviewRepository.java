package com.gruppe24.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.idclass.ReviewID;
import com.gruppe24.backend.relation.Review;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, ReviewID> {
    
    List<Review> findByUser_UserName(String name);

    List<Review> findByGame_ID(Long gameID);

}
