import { useState, useEffect } from 'react'
import { getCharacters, searchCharacters } from '../services/marvelApi' //

import Header from '../components/Header/Header'
import SearchBar from '../components/SearchBar/SearchBar'
import FilterBar from '../components/FilterBar/FilterBar'
import CharacterList from '../components/CharacterList/CharacterList'

function HomePage() {
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalFound, setTotalFound] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const [favorites, setFavorites] = useState(() => {
    // Pega favoritos do localStorage se existir
    const savedFavs = localStorage.getItem('marvel_favorites')
    return savedFavs ? JSON.parse(savedFavs) : []
  })
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchApi = async () => {
      try {
        let data
        if (searchTerm) {
          // Requisito: Filtrar por nome
          data = await searchCharacters(searchTerm, 0, 20) //
        } else {
          // Requisito: Exibir os 20 primeiros
          data = await getCharacters(0, 20, orderBy) //
        }
        setCharacters(data.results)
        setTotalFound(data.total)
      } catch (err) {
        console.error(err)
      }
      setIsLoading(false)
    }

    const debounceFetch = setTimeout(fetchApi, 500)
    return () => clearTimeout(debounceFetch)

  }, [searchTerm, orderBy]) // Roda o efeito quando 'searchTerm' ou 'orderBy' mudam

  useEffect(() => {
    localStorage.setItem('marvel_favorites', JSON.stringify(favorites))
  }, [favorites])

  const handleToggleFavorite = (characterId) => {
    setFavorites(prev => {
      const isFav = prev.includes(characterId)
      if (isFav) {
        // Remove
        return prev.filter(id => id !== characterId)
      }
      // Requisito: Limite de 5 favoritos
      if (prev.length < 5) {
        // Adiciona
        return [...prev, characterId]
      }
      alert('Você pode favoritar no máximo 5 personagens.')
      return prev
    })
  }

  const displayedCharacters = showFavoritesOnly
    ? characters.filter(c => favorites.includes(c.id))
    : characters

  return (
    <div className="home-page">
      <Header />

      <div className="home-header">
        <h2>Explore o Universo</h2>
        <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
      </div>

      <SearchBar onSearch={setSearchTerm} />

      <FilterBar
        total={showFavoritesOnly ? displayedCharacters.length : totalFound}
        isSorted={orderBy === 'name'}
        onSortToggle={() => setOrderBy(o => o === 'name' ? '-name' : 'name')}
        showFavorites={showFavoritesOnly}
        onFavoritesToggle={() => setShowFavoritesOnly(s => !s)}
      />

      {isLoading ? (
        <div className="loading">Carregando heróis...</div>
      ) : (
        <CharacterList
          characters={displayedCharacters}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  )
}

export default HomePage