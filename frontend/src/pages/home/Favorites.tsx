import { useEffect, useState } from "react";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";
import "./Favorites.css";
import React from "react";
import { List } from "../../services/Models";
import { createList, getMyLists } from "../../services/Listservice";
import { getGamesFromList } from "../../services/GameService";
import Button from "../../components/Button/Button";

function Favorites() {
  const [lists, setLists] = React.useState<Array<List>>([]);
  const [emojis, setEmojis] = React.useState<Map<number, string[]>>(new Map());
  const [showInputBox, setShowInputBox] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const list = await getMyLists();
        setLists(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLists();
  }, []);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const emojiDict = new Map<number, string[]>();
        for (const list of lists) {
          const games = await getGamesFromList(list.id);
          const tempEmojis: string[] = [];
          for (const game of games) {
            tempEmojis.push(game.emoji ?? "");
            if (tempEmojis.length === 4) {
              break;
            }
          }
          emojiDict.set(list.id, tempEmojis);
        }
        setEmojis(emojiDict);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEmojis();
  }, [lists]);

  const handleCreatePlaylistClick = () => {
    setShowInputBox(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  const handleOkClick = async () => {
    if (!playlistName.trim()) {
      window.alert("Spilleliste må ha et navn.");
      return;
    }
    try {
      await createList({ name: playlistName, id: 0 });
      setShowInputBox(false);
      setPlaylistName("");
      window.location.reload();
      window.alert("Spilleliste laget.");
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  return (
    <div>
      {showInputBox ? (
        <div className="input-container">
          <input
            type="text"
            placeholder="Navn på spilleliste"
            value={playlistName}
            onChange={handleInputChange}
          />
          <div className="button-container">
            <button className="ok-button" onClick={handleOkClick}>OK</button>
            <button className="cancel-button" onClick={() => setShowInputBox(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="add-playlist-button">
          <Button onClick={handleCreatePlaylistClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="button-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: '8px' }} // Adjust the margin as needed
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            <p>Lag ny spilleliste</p>
          </Button>
        </div>
      )}
      <div className="favorite-lists">
        <FavoriteCard
          emojilist={["🍕", "🍔", "🍟", "🏆", "🧪"]}
          listname="Veryveryveryveryverylonglistname"
          id={0}
          key={999}
        />
        <FavoriteCard
          emojilist={["😳", "✨", "🌈"]}
          listname="Fadderuke"
          id={0}
          key={998}
        />
        {lists.map((list: List) => (
          <FavoriteCard
            emojilist={emojis.get(list.id) ?? []}
            listname={list.name ?? "Default"}
            id={list.id}
            key={list.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
