import React from 'react'
import { Link } from 'react-router-dom'
import iconHeartFilled from '../../assets/icones/heart/Path Copy 7@1,5x.png'
import iconHeartOutline from '../../assets/icones/heart/Path Copy 2.png'
import './CharacterCard.css'

const CharacterCard = ({ character, isFavorite, onToggleFavorite }) => {
  const { path, extension } = character.thumbnail
  const securePath = path.replace('http://', 'https://')
  const imageUrl = `${securePath}.${extension}`
  const isImageAvailable = !path.includes('image_not_available')

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    onToggleFavorite(character.id)
  }

  return (
    <Link to={`/hero/${character.id}`} className="character-card">
      <div className="character-image-wrapper">
        {isImageAvailable ? (
          <img src={imageUrl} alt={character.name} className="character-image" />
        ) : (
          <div className="character-image-placeholder">
            <span>?</span>
          </div>
        )}
      </div>
      <div className="character-card-info">
        <h3 className="character-name" title={character.name}>
          {character.name}
        </h3>
        <img
          src={isFavorite ? iconHeartFilled : iconHeartOutline}
          alt="Favoritar"
          className="fav-icon"
          onClick={handleFavoriteClick}
        />
      </div>
    </Link>
  )
}

export default CharacterCard