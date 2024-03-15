import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame } from '../../services/GameService';
import { Game, List, Review } from '../../services/Models';
import './GameDetails.css';
import Timer from '../Timer/Timer';
import { getGamesReviews } from '../../services/ReviewService';
import ReviewPrompt from '../Review/ReviewPrompt';
import ReportFlag from '../Flag/Flag.tsx';
import useAuthCheck from '../../services/AuthService.ts';
import { addGameToList, getMyLists } from '../../services/Listservice.ts';


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
  const [lists, setLists] = useState<Array<List>>([]);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleListDropDown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const doAddGameToList = (listId: number, gameId: number) => {
    addGameToList(listId, gameId)
    toggleListDropDown()
  }

  const fetchGameDetails = useCallback(async () => {
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
    const fetchLists = async () => {
      try {
        const myLists = await getMyLists();
        setLists(myLists);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
    fetchLists();
  }, [id]);

  

  const addToFavorites = async () => {
    if (game !== null && game.id !== null) {
      const lists = await getMyLists();
      await addGameToList(lists[0].id, game.id ?? 0);
    }
    //alert("Spillet er lagt til i favoritter!");

    //addGameToList
    //listnumber 1
    //game id som er link
  };

  function shareGame(): void {
    // Check if the Clipboard API is supported by the browser
    if (!navigator.clipboard) {
      console.error("Clipboard API not supported");
      return;
    }

    // Get the current URL
    const url: string = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy URL to clipboard:", error);
      });
  }

  useEffect(() => {
    fetchGameDetails();
  }, [fetchGameDetails]);

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
        <p><span className="label">Report:</span> <span><ReportFlag id={game.id ?? 0} onUpdate={fetchGameDetails}/></span></p>

      </div>
      <button onClick={addToFavorites}>Legg til i favoritter</button>
      <button onClick={toggleListDropDown}>Legg til i spilleliste</button>
      <div>
        {isDropdownVisible && (
          <div className="game-dropdown-menu">
            {lists.map((list) => (
              <div
                key={list.id}
                className="game-dropdown-item"
                onClick={() => doAddGameToList(Number(list.id), game?.id ?? 0)}
              >
                <p>{list.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={shareGame}>Del</button>
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
