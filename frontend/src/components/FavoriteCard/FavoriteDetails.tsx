import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { List } from "../../services/Models";
import { getList } from "../../services/Listservice";

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
      navigate(`/game/${randomGameId}`);
    }
  };

  if (list === null) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <p>{list.name ?? "List not found."}</p>
      <button onClick={handleRandomize}>Randomize</button>
    </div>
  );
};

export default FavoriteDetails;