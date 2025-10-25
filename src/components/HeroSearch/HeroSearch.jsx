import React from 'react';
import './HeroSearch.css';
import lupaIcon from '../../assets/busca/Lupa/Shape.png';

const HeroSearch = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="hero-search-bar-container">
      <img src={lupaIcon} alt="Buscar" className="hero-search-icon" />
      <input
        type="text"
        placeholder="Procure por heróis"
        className="hero-search-input" onChange={handleChange}
      />
    </div>
  );
};

export default HeroSearch;