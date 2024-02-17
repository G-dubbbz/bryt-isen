package com.gruppe24.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe24.backend.entity.GameList;
import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.idclass.HasGameListID;
import com.gruppe24.backend.relation.HasGameList;

@Repository
public interface HasGameListRepository extends JpaRepository<HasGameList, HasGameListID> {
    
    Optional<List<HasGameList>> findByUser_UserName(String name);

    Optional<HasGameList> findByGameList_ID(Long ID);

    Optional<HasGameList> findByUserAndGameList(User user, GameList list);
}
