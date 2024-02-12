package com.gruppe24.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.idclass.HasCategoryID;
import com.gruppe24.backend.relation.HasCategory;

@Repository
public interface HasCategoryRepository extends JpaRepository<HasCategory, HasCategoryID> {
    
    HasCategory findByGame_ID(Long gameID);

    HasCategory findByCategory_Name(String categoryName);

}
