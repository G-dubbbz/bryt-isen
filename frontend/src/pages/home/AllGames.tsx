import React, { useState, useEffect } from "react";
import "./AllGames.css";
import { getGames } from "../../services/GameService";
import { Game } from "../../services/Models";
import GameCard from "../../components/GameCard/GameCard";
import Search from "../../components/Search/Search"; // Updated import

const AllGames: React.FC = () => {
  const [games, setGames] = useState<Array<Game>>([]);
  const [filteredGames, setFilteredGames] = useState<Array<Game>>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const list = await getGames();
        setGames(list);
        setFilteredGames(list); // Initially, all games are displayed
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

  return (
    <div>
      <div className="search-and-grid">
        <Search onSearch={handleSearch} />
        <div className="game-grid">
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
    </div>
  );
};

export default AllGames;
