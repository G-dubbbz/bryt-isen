import React, { useEffect } from "react";
import "./AllGames.css";
import { getGames } from "../../services/GameService";
import { Game } from "../../services/Models";
import GameCard from "../../components/GameCard/GameCard";

const AllGames: React.FC = () => {
  const [games, setGames] = React.useState<Array<Game>>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const list = await getGames();
        setGames(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGames();
  });

  return (
    <div>
      <div className="game-grid">{games.map(game => (
        <GameCard emoji={game.emoji !== undefined ? game.emoji : "🧪"} name={game.name !== undefined ? game.name : 'Default'} key={game.id !== undefined ? game.id : 0} />
      ))}</div>
    </div>
  );
};

export default AllGames;