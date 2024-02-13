import './App.css'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import TopGames from './pages/home/TopGames'
import Favorites from './pages/home/Favorites'
import AllGames from './pages/home/AllGames'

function App() {
  console.log(window.location)
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TopGames />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/all" element={<AllGames />} />
      </Routes>
    </>
  )
}

export default App
