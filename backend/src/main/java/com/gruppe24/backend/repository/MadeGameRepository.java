package com.gruppe24.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.idclass.MadeGameID;
import com.gruppe24.backend.relation.MadeGame;

@Repository
public interface MadeGameRepository extends JpaRepository<MadeGame, MadeGameID> {
    
    MadeGame findByUser_UserName(String name);

    MadeGame findByGame_ID(Long gameID);

}
