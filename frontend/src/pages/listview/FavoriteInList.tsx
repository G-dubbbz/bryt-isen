import './FavoriteInList.css'

const FavoriteInList = ({name, emoji, id, duration, players, rating}: {name: string, emoji: string, id: number, duration: string, players: string, rating: number}) => {    
    
    
    return (
        <div className="game-item">
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
                <div className="game-duration">Varighet: {duration}</div>
                <div className="game-players">Antall spillere: {players}</div>
            </div>
            <div className="remove-button">
                <div className="remove-cross">
                </div>
            </div>
        </div>
    )
}

export default FavoriteInList;
