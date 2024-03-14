import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame } from '../../services/GameService';
import { Game, Review } from '../../services/Models';
import './GameDetails.css';
import Timer from '../Timer/Timer';
import { getGamesReviews } from '../../services/ReviewService';
import ReviewPrompt from '../Review/ReviewPrompt';
import ReportFlag from '../Flag/Flag.tsx';
import useAuthCheck from '../../services/AuthService.ts';


const CreateReviewButton: React.FC<{id: number}> = ({id}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useAuthCheck({setLoggedIn: setIsLoggedIn, shouldRedirect: false});

  return (
    <>
    {isLoggedIn && (
      <button onClick={() => navigate(`/review/${id}`)}>Skriv en anmeldelse</button>
    )}
    </>
    );
}

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (id) {
        try {
          const gameData = await getGame(id);
          setGame(gameData);
          // Fetch reviews for the game
          const gameReviews = await getGamesReviews(Number(id));
          setReviews(gameReviews);
        } catch (error) {
          console.error("Error fetching game details:", error);
        }
      }
    };

    fetchGameDetails();
  }, [id]);

  // La oss regne ut average rating, fordi det er gøy
  useEffect(() => {
    if (reviews.length > 0) {
      const averageRating =
        reviews.reduce((sum, review) => sum + (review.stars ?? 0), 0) / reviews.length;
      setGame((prevGame) => prevGame && { ...prevGame, rating: averageRating });
    }
  }, [reviews]);

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
        <p><span className="label">Min Varighet:</span> <span>{game.duration_min !== undefined ? `${game.duration_min} Minutes` : 'N/A'}</span></p>
        <p><span className="label">Max Varighet:</span> <span>{game.duration_max !== undefined ? `${game.duration_max} Minutes` : 'N/A'}</span></p>
        <p><span className="label">Antall vurderinger:</span> <span>{game.reviewCount}</span></p>
        <p><span className="label">Antall ganger rapportert:</span> <span>{game.reportCount}</span></p>
        <div><span className="label">Timer:</span> <Timer /> </div>
        <p><span className="label">Report:</span> <span><ReportFlag id={game.id ?? 0}/></span></p>

      </div>
      <br />
        <div className="reviews">
          <h2>Anmeldelser</h2>
          <CreateReviewButton id={game.id ?? 0} />
          {reviews.map((review: Review, index) => (
            <ReviewPrompt
              key={index}
              stars={review.stars ?? 0}
              creator={review.user?.userName ?? ''}
              text={review.description ?? ''}
            />
          ))}
        </div>
    </div>
  );
};

export default GameDetails;