package com.gruppe24.backend.service;

import com.gruppe24.backend.entity.GameList;
import com.gruppe24.backend.repository.GameListRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameListService {

  private final GameListRepository gameListRepository;

  public GameListService(GameListRepository gameListRepository) {
    this.gameListRepository = gameListRepository;
  }

  @Transactional
  public List<GameList> readLists() {
    return gameListRepository.findAll();
  }
}
