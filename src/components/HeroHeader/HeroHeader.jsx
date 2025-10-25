import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeroHeader.css';
import marvelLogo from '../../assets/logo/Group.png';
import SearchBar from '../SearchBar/SearchBar';

const HeroHeader = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/?search=${query}`);
  };

  return (
    <header className="app-header-hero">
      <Link to="/">
        <img src={marvelLogo} alt="Marvel Logo" className="header-logo" />
      </Link>
      <SearchBar onSearch={handleSearch} />
    </header>
  );
};

export default HeroHeader;