import React from 'react'
import './SearchBar.css'
import lupaIcon from '../../assets/busca/Lupa/Shape.png'

const SearchBar = ({ onSearch }) => {

  const handleChange = (event) => {
    onSearch(event.target.value)
  }

  return (
    <div className="search-bar-container">
      <img src={lupaIcon} alt="Buscar" className="search-icon" />
      <input
        type="text"
        placeholder="Procure por heróis"
        className="search-input"
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar