package com.gruppe24.backend.service;

import org.springframework.stereotype.Service;

import com.gruppe24.backend.entity.Game;
import com.gruppe24.backend.entity.GameList;
import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.idclass.ContainsGameID;
import com.gruppe24.backend.relation.ContainsGame;
import com.gruppe24.backend.repository.ContainsGameRepository;
import com.gruppe24.backend.repository.GameListRepository;
import com.gruppe24.backend.repository.GameRepository;
import com.gruppe24.backend.repository.HasGameListRepository;
import com.gruppe24.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import java.util.List;

@Service
public class GameListRelationService {
    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final GameListRepository gameListRepository;
    private final ContainsGameRepository containsGameRepository;
    private final HasGameListRepository hasGameListRepository;

    public GameListRelationService(UserRepository userRepository, GameRepository gameRepository, GameListRepository gameListRepository, ContainsGameRepository containsGameRepository, HasGameListRepository hasGameListRepository){
        this.userRepository=userRepository;
        this.gameRepository=gameRepository;
        this.gameListRepository=gameListRepository;
        this.containsGameRepository=containsGameRepository;
        this.hasGameListRepository=hasGameListRepository;
    }

    //TODO: Handle exception
    @Transactional
    public User getCreator(Long listID) {
        User creator = hasGameListRepository.findByGameList_ID(listID);
        return creator;
    }

    //TODO: Handle exception
    @Transactional
    public List<Game> getGames(Long listID) {
        List<Game> games = containsGameRepository.findByGameListID(listID);
        return games;
    }

    @Transactional
    public void addGame(Long gameID, Long listID) {
        ContainsGame containsGame = new ContainsGame();
        containsGame.setGame(gameRepository.findByID(gameID));
        containsGame.setGameList(gameListRepository.findByID(listID));
        containsGameRepository.save(containsGame);
    }

    @Transactional
    public void removeGame(Long gameID, Long listID) {
        Game game = gameRepository.getReferenceById(gameID);
        GameList gameList = gameListRepository.getReferenceById(listID);
        ContainsGameID containsGameID = new ContainsGameID(game,gameList);
        containsGameRepository.deleteById(containsGameID);
    }
}