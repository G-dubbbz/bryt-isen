import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { List } from "../../services/Models";
import { getList } from "../../services/Listservice";

const BaseURL = "http://localhost:5173/";

const FavoriteDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [list, setList] = useState<List | null>(null);

  useEffect(() => {
    const fetchListDetails = async () => {
      if (id) {
        try {
          const currentList = await getList(Number(id));
          setList(currentList);
        } catch (error) {
          console.error("Error fetching game details:", error);
        }
      }
    };

    fetchListDetails();
  }, [id]);

  const handleRandomize = () => {
    if (list && list.games.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.games.length);
      const randomGameId = list.games[randomIndex].id;
      const isInPlaylist = list.games.some(game => game.id === randomGameId);

      if (isInPlaylist) { //sjekker om spillet er i listen
        navigate(BaseURL + `/game/${randomGameId}`);
      } else { //hvis ikke, prøv igjen
        console.log("Randomly selected game is not in the playlist. Trying again...");
        handleRandomize();
      }
    }
  };

  if (list === null) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <p>{list.name ?? "List not found."}</p>
      <button onClick={handleRandomize}>Pick a random game!</button>
    </div>
  );
};

export default FavoriteDetails;
