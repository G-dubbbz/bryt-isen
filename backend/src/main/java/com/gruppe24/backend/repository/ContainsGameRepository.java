package com.gruppe24.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.idclass.ContainsGameID;
import com.gruppe24.backend.relation.ContainsGame;

@Repository
public interface ContainsGameRepository extends JpaRepository<ContainsGame, ContainsGameID> {
    
    List<Game> findByGameListID(Long ID);

}
