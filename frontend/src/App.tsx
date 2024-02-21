import './App.css'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import TopGames from './pages/home/TopGames'
import Favorites from './pages/home/Favorites'
import AllGames from './pages/home/AllGames'
import CreateGame from './pages/creategame/CreateGame'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/LogIn/Login'
import LoginSuccess from './components/LogIn/LoginSuccess'

// This way of handling the clientId is probaly not secure, but it works for now
const clientId = "721101879951-1h9gbapa71463dp1ubv3hiuel63td6mq.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Header />
      <Routes>
        <Route path="/" element={<TopGames />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/all" element={<AllGames />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/success" element={<LoginSuccess />} />
      </Routes>
      <footer>
        <hr />
        <p>Laget av Gruppe24</p>
      </footer>
    </GoogleOAuthProvider>

  );
}

export default App;
