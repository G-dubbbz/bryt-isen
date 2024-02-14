package com.gruppe24.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.idclass.MadeGameID;
import com.gruppe24.backend.relation.MadeGame;

@Repository
public interface MadeGameRepository extends JpaRepository<MadeGame, MadeGameID> {
    
    List<Game> findByUser_UserName(String name);

    User findByGame_ID(Long gameID);

}
