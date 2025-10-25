import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import HeroPage from './pages/HeroPage/HeroPage'
import Footer from './components/Footer/Footer'
import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('marvel_favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem('marvel_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (characterId) => {
    setFavorites(prev => {
      const isFav = prev.includes(characterId);
      if (isFav) {
        return prev.filter(id => id !== characterId);
      }
      if (prev.length < 5) {
        return [...prev, characterId];
      }
      alert('Você pode favoritar no máximo 5 personagens.');
      return prev;
    });
  };

  return (
    <div className="app-layout">
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<HomePage favorites={favorites} onToggleFavorite={handleToggleFavorite} />}
          />
          <Route
            path="/hero/:heroId"
            element={<HeroPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />}
          />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App