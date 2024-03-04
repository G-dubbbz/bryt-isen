import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Favorites() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/listview");
    }, [navigate]);
  return(
    <p>Favorites.</p>
  )
}

export default Favorites;