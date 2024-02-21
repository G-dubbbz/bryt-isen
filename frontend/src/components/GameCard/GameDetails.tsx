import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGame } from '../../services/GameService';
import { Game } from '../../services/Models';
import './GameDetails.css';

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (id) {
        try {
          const gameData = await getGame(id); // Pass id as string directly
          setGame(gameData);
        } catch (error) {
          console.error("Error fetching game details:", error);
        }
      }
    };

    fetchGameDetails();
  }, [id]);

  if (!game) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
        <h1 className="heading">{game.name}</h1>
        <p className="description">Beskrivelse: {game.description}</p>
        <div className="info">
        <p><span className="label">Vurdering</span> <span>{game.rating}</span></p>
        <p><span className="label">Min Spillere</span> <span>{game.players_min}</span></p>
        <p><span className="label">Max Spillere</span> <span>{game.players_max}</span></p>
        <p><span className="label">Min Carighet:</span> <span>{game.duration_min} Minutes</span></p>
        <p><span className="label">Max Varighet:</span> <span>{game.duration_max} Minutes</span></p>
        <p><span className="label">Antall vurderinger:</span> <span>{game.reviewCount}</span></p>
        <p><span className="label">Antall ganger rapportert:</span> <span>{game.reportCount}</span></p>

     </div>
    </div>
  );
}

export default GameDetails;