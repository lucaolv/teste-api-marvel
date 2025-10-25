import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeroHeader.css';
import marvelLogo from '../../assets/logo/Group.png';
import HeroSearch from '../HeroSearch/HeroSearch';

const HeroHeader = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="app-header-hero">
      <Link to="/" className="header-logo-link-hero">
        <img src={marvelLogo} alt="Marvel Logo" className="header-logo-hero" />
      </Link>
      <div className="search-wrapper-hero">
        <HeroSearch onSearch={handleSearch} />
      </div>
    </header>
  );
};

export default HeroHeader;