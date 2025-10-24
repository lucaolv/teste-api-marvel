// src/App.jsx
import HomePage from './pages/HomePage'
import Footer from './components/Footer/Footer' // 1. Importe o Footer
import './App.css'

function App() {
  return (
    <div className="app-layout"> {/* 2. Adicione este wrapper */}
      <div className="app-container">
        <HomePage />
      </div>
      <Footer /> {/* 3. Adicione o Footer fora do container */}
    </div>
  )
}

export default App