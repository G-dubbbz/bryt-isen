package com.gruppe24.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.idclass.HasGameListID;
import com.gruppe24.backend.relation.HasGameList;

@Repository
public interface HasGameListRepository extends JpaRepository<HasGameList, HasGameListID> {
    
    HasGameList findByUser_UserName(String name);

    HasGameList findByGameList_ID(Long ID);

}
