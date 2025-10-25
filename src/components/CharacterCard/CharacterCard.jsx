import React from 'react'
import iconHeartFilled from '../../assets/icones/heart/Path Copy 7@1,5x.png'
import iconHeartOutline from '../../assets/icones/heart/Path Copy 2.png'
import './CharacterCard.css'

const CharacterCard = ({ character, isFavorite, onToggleFavorite }) => {
  const { path, extension } = character.thumbnail
  const securePath = path.replace('http://', 'https://')
  const imageUrl = `${securePath}.${extension}`
  const isImageAvailable = !path.includes('image_not_available')

  return (
    <div className="character-card">
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
          onClick={() => onToggleFavorite(character.id)}
        />
      </div>
    </div>
  )
}

export default CharacterCard