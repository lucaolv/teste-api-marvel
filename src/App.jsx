import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/hero/:heroId" element={<div>Página do Herói (Placeholder)</div>} />

          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App