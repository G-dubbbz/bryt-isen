import FavoriteInList from './FavoriteInList';
import './PlaylistView.css'
import PlaylistHeader from './PlaylistHeader';
import { useEffect, useState } from 'react';
import { Game, List } from "../../services/Models"
import { getGamesFromList } from '../../services/GameService';
import { useParams } from 'react-router-dom';
import { getList, removeGameFromList } from '../../services/Listservice';


function PlaylistView() {
    
    const { id } = useParams<{ id?: string }>();
    const [list, setList] = useState<List>();
    const [games, setGames] = useState<Array<Game>>([]);
    
    const handleRemoveGame = async (gameId: number) => {
        if (list) {
            await removeGameFromList(list.id, gameId); // Call removeGameFromList function with listId and gameId
            // Update the games list after removing the game
            const updatedGames = games.filter(game => game.id !== gameId);
            setGames(updatedGames);
        }
    };

    useEffect (() => {
        const fetchList = async () => {
            if (id == undefined) {
                return
            }
            const list = await getList(parseInt(id));
            setList(list);
            const games = await getGamesFromList(parseInt(id))
            setGames(games)
        }
        fetchList();
    }, [id]);

    return (
        <div className="playlist-view">
            <PlaylistHeader name = {list?.name ?? "name not found"}/>
            <div className="game-items-container">
                {games.map(game => (
                    <FavoriteInList name={game?.name ?? "name not found"} 
                    emoji= {game?.emoji ?? "🤌"} 
                    // TODO: Fix id
                    id={game?.id ?? 1} 
                    duration_min={game?.duration_min ?? "duration not found"}
                    duration_max={game?.duration_max ?? "duration not found"}
                    players_min={game?.players_min ?? "players not found"}
                    players_max={game?.players_max ?? "players not found"}
                    // TODO: fix default rating
                    rating={game?.rating ?? 100}
                    handleRemove={handleRemoveGame}
                  />
                ))}
                {/* <FavoriteInList />
                <FavoriteInList />
                <FavoriteInList /> */}
            </div>
        </div>
    )
}

export default PlaylistView;