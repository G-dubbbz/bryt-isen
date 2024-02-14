package com.gruppe24.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.entity.Category;
import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.idclass.HasCategoryID;
import com.gruppe24.backend.relation.HasCategory;

@Repository
public interface HasCategoryRepository extends JpaRepository<HasCategory, HasCategoryID> {
    
    List<Category> findByGame_ID(Long gameID);

    List<Game> findByCategory_Name(String categoryName);

}