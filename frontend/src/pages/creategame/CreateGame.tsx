import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateGame.css";
import { createGame } from "../../services/GameService";
import { Game } from "../../services/Models";
import useAuthCheck from "../../services/AuthService";

function CreateGame() {
  const setLoggedIn = () => {};
  useAuthCheck({setLoggedIn});

  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🥸",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "🙈",
    "🙉",
    "🙊",
    "💋",
    "💌",
    "💘",
    "🫶",
    "🫶",
    "👌",
    "🤏",
    "🤌",
    "🤞",
    "👊",
    "👎",
    "👍",
    "👆",
    "🖕",
    "🤘",
    "🤙",
    "👋",
  ];

  const [emoji, setEmoji] = useState(() => {
    const length = emojis.length;
    const randomIndex = Math.floor(Math.random() * length);
    return emojis[randomIndex];
  });

  const changeEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setEmoji(emojis[randomIndex]);
  };

  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameRules, setGameRules] = useState("");
  const [gameMinH, setGameMinH] = useState("");
  const [gameMaxH, setGameMaxH] = useState("");
  const [gameMinPlayer, setGameMinPlayer] = useState("");
  const [gameMaxPlayer, setGameMaxPlayer] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const navigate = useNavigate();
  const leave = () => {
    // Wait a bit before navigating to allow the backend to update
    setTimeout(() => navigate("/all"), 1500);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setSelectedCategories(prev =>
      checked
        ? [...prev, value]
        : prev.filter(category => category !== value)
    );
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const game: Game = {
      name: gameName,
      description: gameDescription,
      rules: gameRules,
      emoji: emoji,
      duration_min: parseInt(gameMinH),
      duration_max: parseInt(gameMaxH),
      players_min: parseInt(gameMinPlayer),
      players_max: parseInt(gameMaxPlayer),
      categories: selectedCategories,
      reviewCount: 0,
      reportCount: 0
    };
    createGame(game).then(() => leave());
  };

  const categoryOptions = ["E1", "E2", "E3", "E4"];

  return (
    <>
      <Link className="return_link" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
        <h2>Avbryt</h2>
      </Link>

      <form className="create_game_form">
        <label htmlFor="game_name">Navn på leken:</label>
        <input
          type="text"
          id="game_name"
          name="game_name"
          placeholder="Game Name"
          value={gameName}
          required
          onChange={(e) => setGameName(e.target.value)}
        />
        <label htmlFor="game_description">Beskrivelse:</label>
        <textarea
          id="game_description"
          name="game_description"
          placeholder="Game Description"
          value={gameDescription}
          required
          onChange={(e) => setGameDescription(e.target.value)}
        />
        <label htmlFor="game_rules">Regler:</label>
        <textarea
          id="game_rules"
          name="game_rules"
          placeholder="Game Rules"
          value={gameRules}
          required
          onChange={(e) => setGameRules(e.target.value)}
        />
        <label htmlFor="game_minh">Varighet:</label>{" "}
        {/* TODO: Add restrictions for nonsensical inputs*/}
        <div className="input_row">
          <input
            type="number"
            id="game_minh"
            name="game_minh"
            placeholder="Min. Hours"
            value={gameMinH}
            required
            onChange={(e) => setGameMinH(e.target.value)}
          />
          <input
            type="number"
            id="game_maxh"
            name="game_maxh"
            placeholder="Max. Hours"
            value={gameMaxH}
            required
            onChange={(e) => setGameMaxH(e.target.value)}
          />
        </div>
        <label htmlFor="game_minplayer">Antall Spillere:</label>{" "}
        {/* TODO: Add restrictions for nonsensical inputs*/}
        <div className="input_row">
          <input
            type="number"
            id="game_minplayer"
            name="game_minplayer"
            placeholder="Min"
            value={gameMinPlayer}
            required
            onChange={(e) => setGameMinPlayer(e.target.value)}
          />
          <input
            type="number"
            id="game_maxplayer"
            name="game_maxplayer"
            placeholder="Max"
            value={gameMaxPlayer}
            required
            onChange={(e) => setGameMaxPlayer(e.target.value)}
          />
        </div>
        <label htmlFor="game_categories">Kategorier:</label>
        <div className="input_row">
          {categoryOptions.map((category, index) => (
            <div className="checkbox_item" key={index}>
              <input
                type="checkbox"
                id={category}
                name="categories"
                value={category}
                onChange={handleCategoryChange}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
        <label htmlFor="game_emoji">Logo:</label>
        <div className="emoji_picker">
          <p id="emoji">{emoji}</p>
          <input type="button" value="Bytt Emoji" onClick={changeEmoji} />
        </div>
        <input
          type="submit"
          id="create_button"
          value="Lag Spillet"
          onClick={handleSubmit as React.MouseEventHandler<HTMLInputElement>}
        />
      </form>
    </>
  );
}

export default CreateGame;