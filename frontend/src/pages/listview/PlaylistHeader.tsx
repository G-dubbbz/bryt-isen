import { Link } from 'react-router-dom';
import './PlaylistHeader.css'; // Import the CSS file

const PlaylistHeader = ({name}: {name: string}) => {

    return (
        <>
            <Link className="return-text" to="/">
                {/* TODO: Add link */}
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                </svg>
                Return
            </Link>
            <div className="playlist-header">
                <div className="playlist-icon">
                    {/* You can insert the playlist icon here */}
                </div>
                <div className="playlist-info">
                    <div className="playlist-title">{name}</div>
                    <div className="playlist-buttons">
                        {/* TODO: Add links */}
                        <Link className="playlist-button play" to={'/game/7'}></Link>
                        <Link className="playlist-button shuffle" to={'/game/6'}></Link>
                        <Link className="playlist-button share" to={'/game/8'}></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaylistHeader;