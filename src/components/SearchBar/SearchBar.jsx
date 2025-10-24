import React from 'react'
import './SearchBar.css' // Vamos criar este arquivo CSS a seguir
import lupaIcon from '../../assets/busca/Lupa/Shape.png' // Importa o ícone da lupa

// Recebe a função onSearch do HomePage via props
const SearchBar = ({ onSearch }) => {

  // Função chamada sempre que o texto no input muda
  const handleChange = (event) => {
    onSearch(event.target.value) // Chama a função onSearch (que é o setSearchTerm)
  }

  return (
    <div className="search-bar-container">
      <img src={lupaIcon} alt="Buscar" className="search-icon" />
      <input
        type="text"
        placeholder="Procure por heróis" // Texto do layout
        className="search-input"
        onChange={handleChange} // Chama handleChange a cada alteração
      />
    </div>
  )
}

export default SearchBar