package com.gruppe24.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.idclass.ContainsGameID;
import com.gruppe24.backend.relation.ContainsGame;

@Repository
public interface ContainsGameRepository extends JpaRepository<ContainsGame, ContainsGameID> {
    
    public ContainsGame findByGameListID(Long ID);

}
