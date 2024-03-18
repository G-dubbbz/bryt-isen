import React, { useState, useEffect } from "react";
import "./AllGames.css";
import { getGames } from "../../services/GameService";
import { Category, Game } from "../../services/Models";
import GameCard from "../../components/GameCard/GameCard";
import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";

const AllGames: React.FC = () => {
  const [games, setGames] = useState<Array<Game>>([]);
  const [filteredGames, setFilteredGames] = useState<Array<Game>>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const list = await getGames();
        setGames(list);
        setFilteredGames(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const results = games.filter((game) =>
      (game.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredGames(results);
  };

  const handleFilter = (numPlayers: number, minDuration: number, maxDuration: number, categories: Array<Category>) => {
    const results = games.filter(game => {
      const gameMinPlayers = game.players_min ?? 0;
      const gameMaxPlayers = game.players_max ?? Number.MAX_SAFE_INTEGER;
      const gameMinDuration = game.duration_min ?? 0;
      const gameMaxDuration = game.duration_max ?? Number.MAX_SAFE_INTEGER;
  
      const meetsPlayerCriteria = numPlayers === 0 || (gameMinPlayers <= numPlayers && gameMaxPlayers >= numPlayers);

      const meetsDurationCriteria = 
        (minDuration === 0 && maxDuration === 24) ||
        (gameMaxDuration >= minDuration && gameMinDuration <= maxDuration);

      const hasCategory = categories.length === 0 || categories.every(category => 
        game.categories?.some(gameCategory => gameCategory.name === category.name)
      );
  
      
      return meetsPlayerCriteria && meetsDurationCriteria && hasCategory;
    });
    setFilteredGames(results);
  };
  
  
  

  return (
    <div id="parent">
      <div id="narrow" className="search-and-filter">
        <Search onSearch={handleSearch} />
        <Filter onFilterApplied={handleFilter} />
      </div>
      <div id="wide" className="game-grid">
        {filteredGames.map((game) => (
          <GameCard
            emoji={game.emoji ?? "🧪"}
            name={game.name ?? "Default"}
            key={game.id ?? 0}
            id={game.id}
            players={1}
          />
        ))}
      </div>
    </div>
  );
};

export default AllGames;
