import HomePage from './pages/HomePage'
import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* Aqui é onde você configurará suas rotas (React Router)
        quando tiver a página de Detalhes. 
        Por enquanto, apenas renderizamos a Home.
      */}
      <HomePage />
    </div>
  )
}

export default App