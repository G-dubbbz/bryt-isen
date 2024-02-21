import { useNavigate } from "react-router";
import "./GameCard.css";

export interface GameCardProps {
  emoji: string;
  name: string;
}

export default function GameCard(props: GameCardProps) {
  let navigate = useNavigate();
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
