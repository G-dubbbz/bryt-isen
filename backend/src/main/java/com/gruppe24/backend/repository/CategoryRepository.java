package com.gruppe24.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.entity.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String>{
    
    List<Category> findByName(String name);

}
