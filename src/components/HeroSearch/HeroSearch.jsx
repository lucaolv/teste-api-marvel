import React, { useState } from 'react';
import './HeroSearch.css';
import lupaIcon from '../../assets/busca/Lupa/Shape.png';

const HeroSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="hero-search-bar-container" onSubmit={handleSubmit}>
      <button type="submit" className="hero-search-button">
        <img src={lupaIcon} alt="Buscar" className="hero-search-icon" />
      </button>
      <input
        type="text"
        placeholder="Procure por heróis"
        className="hero-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default HeroSearch;