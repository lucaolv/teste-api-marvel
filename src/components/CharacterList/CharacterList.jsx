import React from 'react'
import CharacterCard from '../CharacterCard/CharacterCard' //

const CharacterList = ({ characters, favorites, onToggleFavorite }) => {
  return (
    <div className="character-list">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          isFavorite={favorites.includes(character.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default CharacterList