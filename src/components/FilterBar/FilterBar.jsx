import React from 'react'
import './FilterBar.css'

import heroIcon from '../../assets/icones/heroi/noun_Superhero_2227044.png' //
import heartIcon from '../../assets/icones/heart/Path.png' //

import toggleOn from '../../assets/toggle/Group 2.svg' //
import toggleOff from '../../assets/toggle/Group 6@1,5x.svg' //

const FilterBar = ({
  total,
  isSorted,
  onSortToggle,
  showFavorites,
  onFavoritesToggle
}) => {

  return (
    <div className="filter-bar-container">
      <div className="total-found">
        Encontrados {total} heróis
      </div>

      <div className="filter-options">
        <div className="sort-control">
          <img src={heroIcon} alt="" className="filter-icon" />
          <span>Ordenar por nome - {isSorted ? 'A/Z' : 'Z/A'}</span>
          <img
            src={isSorted ? toggleOn : toggleOff}
            alt={`Ordenar ${isSorted ? 'A/Z' : 'Z/A'}`}
            className="sort-toggle-img"
            onClick={onSortToggle}
          />
        </div>

        <button
          className={`favorites-button ${showFavorites ? 'active' : ''}`}
          onClick={onFavoritesToggle}
        >
          <img src={heartIcon} alt="" className="filter-icon" />
          <span>Somente favoritos</span>
        </button>
      </div>
    </div>
  )
}

export default FilterBar