import { useNavigate } from "react-router-dom";
import "./Filter.css";
import { useState } from "react";


function Filter() {

  const navigate = useNavigate();
  const leave = () => {
    // Wait a bit before navigating to allow the backend to update
    setTimeout(() => navigate("/all"), 1500);
  };

  const [numPlayers, setNumPlayers] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");

  return (
    <form className="filter-filters">
      <label htmlFor="filter_categories">Filter</label>
      <label htmlFor="filter_categories">Antall Spillere</label>
      <div className="input_row">
            <input
              type="number"
              id="num_players"
              name="num_players"
              placeholder="Antall Spillere"
              value={numPlayers}
              required
              onChange={(e) => setNumPlayers(e.target.value)}
            />
      </div>
      <div>
        <label htmlFor="filter_categories">Varighet</label>
        <div className="input_row">
              <input
                type="number"
                id="min_duration"
                name="min_duration"
                placeholder="Min. Lengde"
                value={minDuration}
                required
                onChange={(e) => setMinDuration(e.target.value)}
              />
        </div>
        <div className="input_row">
              <input
                type="number"
                id="max_duration"
                name="max_duration"
                placeholder="Max. Lengde"
                value={maxDuration}
                required
                onChange={(e) => setMaxDuration(e.target.value)}
              />
        </div>
      </div>
        <label htmlFor="filter_categories">Kategorier</label>
        <div className="input_row">
          <div className="checkbox_item">
            <input
              type="checkbox"
              id="E1"
              name="E1"
              value="E1"
            />
            <label htmlFor="E1">E1</label>
          </div>
          <div className="checkbox_item">
            <input
              type="checkbox"
              id="E2"
              name="E2"
              value="E2"
            />
            <label htmlFor="E2">E2</label>
          </div>
          <div className="checkbox_item">
            <input
              type="checkbox"
              id="E3"
              name="E3"
              value="E3"
            />
            <label htmlFor="E3">E3</label>
          </div>
          <div className="checkbox_item">
            <input
              type="checkbox"
              id="E4"
              name="E4"
              value="E4"
            />
            <label htmlFor="E4">E4</label>
          </div>
        </div>
      <input
        type="submit"
        id="create_button"
        value="Filtrer"
      />
    </form>
  );
}

export default Filter;
