import FavoriteCard from "../../components/FavoriteCard/FavoriteCard"
import './Favorites.css'

function Favorites() {
  return(
    <div className="favorite-lists">
      <FavoriteCard emojilist={["🍕", "🍔", "🍟", "🏆", "🧪"]} listname="Veryveryveryveryverylonglistname" />
      <FavoriteCard emojilist={["😰"]} listname="stress" />
      <FavoriteCard emojilist={["😳", "✨", "🌈"]} listname="Fadderuke" />
    </div>
  )
}

export default Favorites;