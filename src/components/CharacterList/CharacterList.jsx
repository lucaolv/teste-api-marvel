import React from 'react'
import CharacterCard from '../CharacterCard/CharacterCard' //

// Recebe os props do HomePage.jsx
const CharacterList = ({ characters, favorites, onToggleFavorite }) => {
  return (
    <div className="character-list"> {/* */}
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          isFavorite={favorites.includes(character.id)} // Verifica se este card é um favorito
          onToggleFavorite={onToggleFavorite} // Passa a função de clique
        />
      ))}
    </div>
  )
}

export default CharacterList