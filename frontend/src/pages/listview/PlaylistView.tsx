import FavoriteInList from './FavoriteInList';
import './PlaylistView.css'
import PlaylistHeader from './PlaylistHeader';
import { useEffect, useState } from 'react';
import { getList } from '../../services/ListService';
import { Game, List } from "../../services/Models"
import { getGame, getGamesFromList } from '../../services/GameService';
import { useParams } from 'react-router-dom';

function PlaylistView() {
    
    const { id } = useParams<{ id?: string }>();
    const [list, setList] = useState<List>();
    const [games, setGames] = useState<Array<Game>>([]);
    
    useEffect (() => {
        const fetchList = async () => {
            if (id == undefined) {
                return
            }
            const list = await getList(parseInt(id));
            setList(list);
            const games = await getGamesFromList(id)
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
                    emoji= {game?.emoji ?? "name not found"} 
                    // TODO: Fix id
                    id={14} 
                    duration="30 minutes" 
                    players="2-4"
                    rating={4}
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