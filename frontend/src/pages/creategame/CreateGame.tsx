import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateGame.css";
import { createGame } from "../../services/GameService";
import { Game } from "../../services/Models";

function CreateGame() {
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

  const navigate = useNavigate();
  const leave = () => {
    navigate("/all");
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const game: Game = {
      name: gameName,
      description: gameDescription,
      rules: gameRules,
      emoji: emoji,
      duration_min: parseInt(gameMinH),
      duration_max: parseInt(gameMaxH),
      players_min: parseInt(gameMinPlayer),
      players_max: parseInt(gameMaxPlayer)
    };
    createGame(game);
    leave();
  };

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
          <div className="checkbox_item">
            <input
              type="checkbox"
              id="Example1"
              name="Example"
              value="Example1"
            />
            <label htmlFor="Example1">Example1</label>
          </div>
          <div className="checkbox_item">
            <input
              type="checkbox"
              id="Example2"
              name="Example"
              value="Example2"
            />
            <label htmlFor="Example2">Example2</label>
          </div>
          <div className="checkbox_item">
            <input
              type="checkbox"
              id="Example3"
              name="Example3"
              value="Example3"
            />
            <label htmlFor="Example3">Example3</label>
          </div>
          <div className="checkbox_item">
            <input
              type="checkbox"
              id="Example4"
              name="Example4"
              value="Example4"
            />
            <label htmlFor="Example4">Example4</label>
          </div>
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
          onClick={handleSubmit}
        />
      </form>
    </>
  );
}

export default CreateGame;
