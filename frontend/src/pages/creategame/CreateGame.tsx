import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateGame.css";
import { createGame } from "../../services/GameService";
import { Category, Game } from "../../services/Models";
import useAuthCheck from "../../services/AuthService";
import { getAllCategories } from "../../services/CategoryService";

function CreateGame() {
  const setLoggedIn = () => {};
  useAuthCheck({ setLoggedIn });

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
  const [selectedCategories, setSelectedCategories] = useState<Array<Category>>(
    []
  );
  const [categories, setCategories] = useState<Array<Category>>([]);

  const navigate = useNavigate();
  const leave = () => {
    // Wait a bit before navigating to allow the backend to update
    setTimeout(() => navigate("/all"), 1500);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setSelectedCategories((prev) =>
      checked
        ? [...prev, { name: value }]
        : prev.filter((category) => category.name !== value)
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
      reportCount: 0,
    };
    createGame(game).then(() => leave());
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [setCategories]);

  useEffect(() => {
    console.log("Selected Categories:", selectedCategories);
  }, [selectedCategories]);

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
          style={{ paddingTop: '0.5em', paddingLeft: '1em', paddingBottom: '0.5em' }}
          type="text"
          className="input-field"
          id="game_name"
          name="game_name"
          placeholder="Navn på leken ..."
          value={gameName}
          required
          onChange={(e) => setGameName(e.target.value)}
        />
        <label htmlFor="game_description">Beskrivelse:</label>
        <textarea
          id="game_description"
          name="game_description"
          className="text-field"
          placeholder="Beskrivelse ..."
          value={gameDescription}
          required
          onChange={(e) => setGameDescription(e.target.value)}
        />
        <label htmlFor="game_rules">Regler:</label>
        <textarea
          id="game_rules"
          name="game_rules"
          className="text-field"
          placeholder="Regler ..."
          value={gameRules}
          required
          onChange={(e) => setGameRules(e.target.value)}
        />
        <label htmlFor="game_minh">Varighet:</label>{" "}
        {/* TODO: Add restrictions for nonsensical inputs*/}
        <div className="input_row">
          <input
            type="number"
            className="input-field"
            id="game_minh"
            name="game_minh"
            placeholder="Min. minutter ..."
            value={gameMinH}
            required
            onChange={(e) => setGameMinH(e.target.value)}
          />
          <input
            type="number"
            className="input-field"
            id="game_maxh"
            name="game_maxh"
            placeholder="Max. minutter ..."
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
            className="input-field"
            id="game_minplayer"
            name="game_minplayer"
            placeholder="Min. spillere ..."
            value={gameMinPlayer}
            required
            onChange={(e) => setGameMinPlayer(e.target.value)}
          />
          <input
            type="number"
            className="input-field"
            id="game_maxplayer"
            name="game_maxplayer"
            placeholder="Max. spillere ..."
            value={gameMaxPlayer}
            required
            onChange={(e) => setGameMaxPlayer(e.target.value)}
          />
        </div>
        <label htmlFor="game_categories">Kategorier:</label>
        <div className="input_row categories">
          {categories.map((category, index) => {
            const isChecked = selectedCategories.some(
              (selected) => selected.name === category.name
            );
            return (
              <div
                className={`checkbox_item ${isChecked ? "isActive" : ""}`}
                key={index}
                onClick={() => handleCategoryChange}
              >
                <input
                  type="checkbox"
                  id={category.name}
                  name="categories"
                  value={category.name}
                  checked={isChecked}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor={category.name}
                  onClick={() => handleCategoryChange}
                >
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
        <label htmlFor="game_emoji">Logo:</label>
        <div className="emoji_picker">
          <p id="emoji">{emoji}</p>
          <button className="emoji-button" onClick={(e) => {
            e.preventDefault();
            changeEmoji();
          }}>
            <svg 
            xmlns="http://www.w3.org/2000/svg"
            className="buttonIcon"
            width="22" 
            height="22" 
            viewBox="0 0 30 30" 
            strokeWidth="1.5"
            fill="none" 
            >
              <path d="M2 12.8754C2.39681 9.86095 3.88333 7.09382 6.18129 5.09201C8.47924 3.09021 11.4311 1.99097 14.4843 2.00006C17.5375 2.00915 20.4827 3.12595 22.7686 5.1414C25.0545 7.15685 26.5243 9.93278 26.903 12.9496C27.2817 15.9663 26.5433 19.0171 24.826 21.5309C23.1086 24.0446 20.5301 25.8489 17.5731 26.6061C14.6161 27.3633 11.4834 27.0214 8.76128 25.6444C6.03918 24.2675 3.91436 21.9499 2.78458 19.1254M2 26.9379V19.1254H9.84576" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          <p>Bytt emoji</p>
        </button>
        </div>
        
        <button className = "submit-button" onClick={handleSubmit}>
          <p>Lag spill</p>
        </button>
      </form>
    </>
  );
}

export default CreateGame;
