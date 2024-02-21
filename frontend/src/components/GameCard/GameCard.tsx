import { useNavigate } from "react-router";
import "./GameCard.css";

export interface GameCardProps {
  key: number;
  emoji: string;
  name: string;
}

export default function GameCard(props: GameCardProps) {
  const navigate = useNavigate();
  const leave = () => {
    navigate("/"); {/* //TODO: Should navigate to the game description */}
  };
  return (
    <div className="games-card" onClick={leave}>
      <h1>{props.emoji}</h1>
      <h3>{props.name}</h3>
    </div>
  );
}
