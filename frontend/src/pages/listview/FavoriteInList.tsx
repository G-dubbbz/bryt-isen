import './FavoriteInList.css'

function FavoriteInList() {
    return (
        <div className="game-item">
            <div className="game-icon">
                <div className="game-icon-emoji"></div>
            </div>
            <div className="game-info">
                <div className="game-title">GameTitle</div>
                <div className="star-rating">
                    <div className="star-icon">
                        <span role="img" aria-label="star">⭐</span>
                    </div>
                    <div className="rating-value">4.2</div>
                </div>
            </div>
            <div className="game-text">
                <div className="game-duration">Duration</div>
                <div className="game-players">NumberOfPlayers</div>
            </div>
            <div className="remove-button">
                <div className="remove-cross">
                </div>
            </div>
        </div>
    )
}

export default FavoriteInList;
