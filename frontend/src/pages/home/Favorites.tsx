import { useEffect } from "react";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";
import "./Favorites.css";
import React from "react";
import { List } from "../../services/Models";
// import { Game, List } from "../../services/Models";
import { getLists } from "../../services/Listservice";
// import { getGamesFromList } from "../../services/GameService";

function Favorites() {
  const [lists, setLists] = React.useState<Array<List>>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const list = await getLists();
        setLists(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLists();
  }, []);

  // function getEmojis(id: number) {
  //   const [emojis, setEmojis] = React.useState<Array<string>>([]);

  //   useEffect(() => {
  //     const getEmojisFromList = async (id: number) => {
  //       try {
  //         const games = await getGamesFromList(id);
  //         // TODO: Sjekk om lista er tom, isåfall returner default emoji🧪🧪🧪🧪
  //         let emojis = new Set(games.map((game: Game) => game.emoji ?? "🧪"));
  //         setEmojis(Array.from(emojis));
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     getEmojisFromList(id);
  //   }, []);
  //   return emojis;
  // }

  return (
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
          emojilist={
            [
              "🧪",
              "🧪",
              "🧪",
              "🧪",
            ] /* TODO: gjør at lista henter emojis fra spillene i lista, men må sjekke om den er tom */
          }
          listname={list.name ?? "Default"}
          id={list.id}
          key={list.id}
        />
      ))}
    </div>
  );
}

export default Favorites;
