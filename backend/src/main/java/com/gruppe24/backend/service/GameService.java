package com.gruppe24.backend.service;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.repository.GameRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
  private final GameRepository gameRepository;

  public GameService(GameRepository gameRepository) {
    this.gameRepository = gameRepository;
  }

  @Transactional
  public List<Game> readGames() {
    return gameRepository.findAll();
  }
}
