// src/App.jsx
import HomePage from './pages/HomePage'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <div className="app-container">
        <HomePage />
      </div>
      <Footer />
    </div>
  )
}

export default App