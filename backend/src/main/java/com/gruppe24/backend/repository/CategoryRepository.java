package com.gruppe24.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String>{
    
    public Category findBCategoryName(String category);

}
