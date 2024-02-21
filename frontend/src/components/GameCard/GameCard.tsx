import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameCard.css';

export interface GameCardProps {
  key: number;
  emoji: string;
  name: string;
  id: number; // Add id prop
  players: number;
}

const GameCard: React.FC<GameCardProps> = ({ emoji, name, id }) => {
  const navigate = useNavigate();

  const leave = () => {
    navigate(`/game/${id}`); // Navigate to the game details page with the game ID
  };

  return (
    <div className="games-card" onClick={leave}>
      <h1>{emoji}</h1>
      <h3>{name}</h3>
    </div>
  );
}

export default GameCard;