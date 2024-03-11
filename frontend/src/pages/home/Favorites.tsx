import { useEffect } from "react";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";
import "./Favorites.css";
import React from "react";
import { List } from "../../services/Models";
import { getLists } from "../../services/Listservice";
import { getGamesFromList } from "../../services/GameService";

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

  const [emojis, setEmojis] = React.useState<Map<number, string[]>>(new Map());

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
          emojilist={emojis.get(list.id) ?? []}
          listname={list.name ?? "Default"}
          id={list.id}
          key={list.id}
        />
      ))}
    </div>
  );
}

export default Favorites;
