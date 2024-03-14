import { Link, useParams } from 'react-router-dom';
import { getGamesFromList } from '../../services/GameService';
import './PlaylistHeader.css';
import { useEffect, useState } from 'react';
import { Game } from '../../services/Models';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard'; // Import the copy function from the copy-to-clipboard package


const PlaylistHeader = ({ name }: { name: string }) => {

    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [games, setGames] = useState<Array<Game>>([]);
    const [emojis, setEmojis] = useState<Array<string>>([]);


    useEffect(() => {
        const fetchList = async () => {
            if (id == undefined) {
                return
            }
            const games = await getGamesFromList(parseInt(id));
            setGames(games);

            const tempEmojis: string[] = [];
            games.slice(0, 4).forEach((game: Game) => {
                if (game.emoji) {
                    tempEmojis.push(game.emoji);
                }
            });
            setEmojis(tempEmojis);
        };
        fetchList();
    }, [id]);

    const playLeave = () => {
        if (games.length > 0) {
            const id = games[0].id;
            navigate(`/game/${id}`); // Navigate to the game details page with the game ID
        }
    };

    const shuffleLeave = () => {
        if (games.length > 0) {
            const randomIndex = Math.floor(Math.random() * games.length); // Generate a random index
            const id = games[randomIndex].id;
            navigate(`/game/${id}`); // Navigate to the game details page with the game ID
        }
    };

    const shareList = () => {
        const currentURL = window.location.href; // Get the current URL
        copy(currentURL); // Copy the current URL to the clipboard
        alert('Link copied to clipboard'); // Show a popup message
    };

    return (
        <>
            <Link className="return-text" to="/favorites">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                </svg>
                Return
            </Link>
            <div className="playlist-header">
            <div className="playlist-icon">
                    {emojis.map((emoji: string, index: number) => (
                        <div className="playlist-icon-emoji" key={index}>{emoji}</div>
                    ))}
                </div>
                <div className="playlist-info">
                    <div className="playlist-title">{name}</div>
                    <div className="playlist-buttons">
                        <div className="playlist-button play" onClick={playLeave}></div>
                        <div className="playlist-button shuffle" onClick={shuffleLeave}></div>
                        <div className="playlist-button share" onClick={shareList}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaylistHeader;