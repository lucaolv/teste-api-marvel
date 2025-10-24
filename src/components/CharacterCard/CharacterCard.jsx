import React from 'react'

// Importe os ícones de coração
import iconHeartFilled from '../../assets/icones/heart/Path Copy 7@1,5x.png' //
import iconHeartOutline from '../../assets/icones/heart/Path Copy 2.png' //

const CharacterCard = ({ character, isFavorite, onToggleFavorite }) => {

  const { path, extension } = character.thumbnail

  // --- A MELHOR SOLUÇÃO ESTÁ AQUI ---

  // 1. Correção de HTTP para HTTPS:
  // Garante que a URL da imagem seja sempre 'https'
  const securePath = path.replace('http://', 'https://')

  // 2. Montagem da URL final
  const imageUrl = `${securePath}.${extension}`

  // 3. Verificação de placeholder da API
  const isImageAvailable = !path.includes('image_not_available')

  // --- FIM DA SOLUÇÃO ---

  return (
    <div className="character-card">
      {isImageAvailable ? (
        // Renderiza a imagem segura
        <img src={imageUrl} alt={character.name} className="character-image" />
      ) : (
        // Renderiza um placeholder visual se a API não fornecer imagem
        <div className="character-image-placeholder">
          <span>?</span>
        </div>
      )}

      <div className="character-card-info">
        <h3>{character.name}</h3>
        <img
          src={isFavorite ? iconHeartFilled : iconHeartOutline}
          alt="Favoritar"
          className="fav-icon"
          onClick={() => onToggleFavorite(character.id)}
          style={{
            width: '20px',
            height: '20px',
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  )
}

export default CharacterCard