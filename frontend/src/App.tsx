import './App.css'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import TopGames from './pages/home/TopGames'
import Favorites from './pages/home/Favorites'
import AllGames from './pages/home/AllGames'
import CreateGame from './pages/creategame/CreateGame'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TopGames />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/all" element={<AllGames />} />
        <Route path="/create" element={<CreateGame />} />
      </Routes>
      <footer>
        <hr />
        <p>Laget av Gruppe24</p>
      </footer>
    </>
  );
}

export default App;
