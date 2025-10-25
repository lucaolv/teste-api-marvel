import React, { useState } from 'react'
import './SearchBar.css'
import lupaIcon from '../../assets/busca/Lupa/Shape.png'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <button type="submit" className="search-button">
        <img src={lupaIcon} alt="Buscar" className="search-icon" />
      </button>
      <input
        type="text"
        placeholder="Procure por heróis"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  )
}

export default SearchBar