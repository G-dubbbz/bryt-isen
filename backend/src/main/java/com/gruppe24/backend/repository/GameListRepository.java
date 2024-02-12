package com.gruppe24.backend.repository;

import com.gruppe24.backend.entity.GameList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GameListRepository extends JpaRepository<GameList, Long> {

    public GameList findByGameListID(Long ID);

}
