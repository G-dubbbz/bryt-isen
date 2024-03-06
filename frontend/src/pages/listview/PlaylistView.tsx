import FavoriteInList from './FavoriteInList';
import './PlaylistView.css'
import PlaylistHeader from './PlaylistHeader';


function PlaylistView() {
    return (
        <div className="playlist-view">
            <PlaylistHeader />
            <div className="game-items-container">
                <FavoriteInList />
                <FavoriteInList />
                <FavoriteInList />
            </div>
        </div>
    )
}

export default PlaylistView;