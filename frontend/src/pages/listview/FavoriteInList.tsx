import { useNavigate } from 'react-router-dom';
import './FavoriteInList.css';

const FavoriteInList = ({ name, emoji, id, duration_min, duration_max, players_min, players_max, rating, handleRemove }:
    { name: string, emoji: string, id: number, duration_min: number, duration_max: number, players_min: number, players_max: number, rating: number, handleRemove: (gameId: number) => void }) => {

    const navigate = useNavigate();

    const leave = () => {
        navigate(`/game/${id}`); // Navigate to the game details page with the game ID
    };

    const remove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation(); // Prevent the click event from propagating to the parent div
        handleRemove(id); // Call the handleRemove function with the game ID
    };

    return (
        <div className="game-item" onClick={leave}>
            <div className="game-icon">
                <div className="game-icon-emoji">{emoji}</div>
            </div>
            <div className="game-info">
                <div className="game-title">{name}</div>
                <div className="star-rating">
                    <div className="star-icon">
                        <span role="img" aria-label="star">⭐</span>
                    </div>
                    <div className="rating-value">{rating}</div>
                </div>
            </div>
            <div className="game-text">
                <div className="game-duration">Varighet: {duration_min}-{duration_max}</div>
                <div className="game-players">Antall spillere: {players_min}-{players_max}</div>
            </div>
            <div className="remove-button" onClick={remove}>
                <div className="remove-cross"></div>
            </div>
        </div>
    )
}

export default FavoriteInList;
