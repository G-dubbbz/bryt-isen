import { Link } from 'react-router-dom';
import './FavoriteCard.css'

export interface FavoriteCardProps {
  emojilist: string[];
  listname: string;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ emojilist, listname }) => {
  emojilist = emojilist.slice(0, 4);
  const navToList = () => {
    console.log("Navigating to list");
    // TODO: navigate to list
  }
  return (
    <div className="favorite-card" onClick={navToList}>
      <div className="favorite-card_thumbnail">
        {emojilist.map((emoji: string) => <span className="listemoji">{emoji}</span>)}
      </div>
      <Link className="listname" to="/">{listname}</Link>
      {/* TODO: make link redirect to listview */}
    </div>
  );
}

export default FavoriteCard;